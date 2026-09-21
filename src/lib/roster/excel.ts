import { DAY_FULL } from "./types";
import type { StaffMember, WeekRoster } from "./types";
import { DAY_STATIONS, EVENING_STATIONS, stationById } from "./stations";
import { displayName, staffById } from "./staff";
import { formatCell } from "./parse";
import { weekdayISO, weekRangeLabel } from "./dates";
import { holidayName } from "./holidays";
import { validateWeek } from "./validate";

function xmlEscape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cellXml(text: string, style: string, mergeAcross?: number): string {
  const merge = mergeAcross ? ` ss:MergeAcross="${mergeAcross}"` : "";
  const content = xmlEscape(text).replaceAll("\n", "&#10;");
  return `<Cell ss:StyleID="${style}"${merge}><Data ss:Type="String">${content}</Data></Cell>`;
}

function emptyCell(style = "sBody"): string {
  return `<Cell ss:StyleID="${style}"/>`;
}

export function rosterToSpreadsheetXml(week: WeekRoster, staff: StaffMember[]): string {
  const nameOf = (id: string) => staffById(staff, id)?.rosterName ?? id;
  const headers = ["Station", ...DAY_FULL];
  const dayLabels = DAY_FULL.map((label, i) => {
    const iso = weekdayISO(week.monday, i);
    const hol = holidayName(iso);
    return hol ? `${label}\n${hol}` : label;
  });

  const rows: string[] = [];
  rows.push(
    `<Row ss:Height="28">${cellXml("BIOCHEMISTRY LABORATORY", "sBanner", 5)}</Row>`,
  );
  rows.push(`<Row ss:Height="22">${cellXml(week.title, "sTitle", 5)}</Row>`);
  rows.push(
    `<Row ss:Height="16">${cellXml(`Shifts: early 08:00–16:30  ·  day 08:30–17:00  ·  evening 14:00–22:00`, "sSub", 5)}</Row>`,
  );
  rows.push(`<Row ss:Height="8">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);

  const headerCells =
    `<Cell ss:StyleID="sHead"><Data ss:Type="String">${xmlEscape(headers[0])}</Data></Cell>` +
    dayLabels.map((d) => cellXml(d, "sHead")).join("");
  rows.push(`<Row ss:Height="28">${headerCells}</Row>`);

  const pushSection = (label: string) => {
    rows.push(`<Row ss:Height="20">${cellXml(label, "sSection", 5)}</Row>`);
  };

  const pushStation = (id: string, style = "sBody") => {
    const st = stationById(id);
    if (!st) return;
    const label = st.sublabel ? `${st.label}\n${st.sublabel}` : st.label;
    const cells = [cellXml(label, "sStation")];
    for (let d = 0; d < 5; d++) {
      const hol = week.holidays.includes(d);
      const text = hol ? (d === 0 && holidayName(weekdayISO(week.monday, d)) ? holidayName(weekdayISO(week.monday, d))! : "") : formatCell(week.cells[id]?.[d] ?? [], nameOf);
      cells.push(cellXml(text, hol ? "sHoliday" : style));
    }
    rows.push(`<Row ss:Height="36">${cells.join("")}</Row>`);
  };

  pushSection("DAY BENCHES");
  for (const st of DAY_STATIONS) pushStation(st.id);

  // Leave row
  const leaveCells = [cellXml("Leave", "sStation")];
  for (let d = 0; d < 5; d++) {
    const names: string[] = [];
    for (const [id, slots] of Object.entries(week.leave)) {
      const note = slots[d];
      if (!note) continue;
      const n = nameOf(id);
      names.push(note && note !== "Leave" ? `${n} – ${note}` : n);
    }
    leaveCells.push(cellXml(names.join("\n"), "sLeave"));
  }
  rows.push(`<Row ss:Height="40">${leaveCells.join("")}</Row>`);

  rows.push(`<Row ss:Height="10">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);
  pushSection("EVENING  ·  14:00 – 22:00");
  for (const st of EVENING_STATIONS) pushStation(st.id, "sEve");

  if (week.notes.trim()) {
    rows.push(`<Row ss:Height="10">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);
    rows.push(`<Row ss:Height="36">${cellXml("Notes: " + week.notes, "sNotes", 5)}</Row>`);
  }

  // Person sheet
  const personRows: string[] = [];
  personRows.push(`<Row ss:Height="24">${cellXml(`Who’s where  ·  ${weekRangeLabel(week.monday)}`, "sTitle", 5)}</Row>`);
  personRows.push(`<Row ss:Height="24">${headerCells}</Row>`);
  const activeStaff = staff.filter((s) => s.active).sort((a, b) => a.rosterName.localeCompare(b.rosterName));
  for (const s of activeStaff) {
    const cells = [cellXml(`${s.rosterName}${s.lastName ? " " + s.lastName : ""}  (${s.role})`, "sStation")];
    for (let d = 0; d < 5; d++) {
      if (week.leave[s.id]?.[d]) {
        cells.push(cellXml(`LEAVE${week.leave[s.id][d] !== "Leave" ? " – " + week.leave[s.id][d] : ""}`, "sLeave"));
        continue;
      }
      const hits: string[] = [];
      for (const st of [...DAY_STATIONS, ...EVENING_STATIONS]) {
        const as = (week.cells[st.id]?.[d] ?? []).filter((a) => a.staffId === s.id);
        for (const a of as) hits.push(a.note ? `${st.label} (${a.note})` : st.label);
      }
      cells.push(cellXml(hits.join("\n"), "sBody"));
    }
    personRows.push(`<Row ss:Height="40">${cells.join("")}</Row>`);
  }

  const issues = validateWeek(week, staff);
  const issueRows: string[] = [];
  issueRows.push(`<Row ss:Height="24">${cellXml("Coverage check", "sTitle", 2)}</Row>`);
  issueRows.push(
    `<Row ss:Height="22">${cellXml("Level", "sHead")}${cellXml("Day", "sHead")}${cellXml("Message", "sHead")}</Row>`,
  );
  if (!issues.length) {
    issueRows.push(
      `<Row>${cellXml("ok", "sBody")}${emptyCell("sBody")}${cellXml("No issues.", "sBody")}</Row>`,
    );
  }
  for (const i of issues) {
    issueRows.push(
      `<Row ss:Height="22">${cellXml(i.level, "sBody")}${cellXml(DAY_FULL[i.day], "sBody")}${cellXml(i.message, "sBody")}</Row>`,
    );
  }

  const staffRows: string[] = [];
  staffRows.push(
    `<Row ss:Height="22">${cellXml("Name", "sHead")}${cellXml("Initials", "sHead")}${cellXml("Role", "sHead")}${cellXml("FTE", "sHead")}${cellXml("Notes", "sHead")}</Row>`,
  );
  for (const s of activeStaff) {
    staffRows.push(
      `<Row ss:Height="20">${cellXml(displayName(s), "sBody")}${cellXml(s.initials, "sBody")}${cellXml(s.role, "sBody")}${cellXml(s.fte, "sBody")}${cellXml(s.notes ?? "", "sBody")}</Row>`,
    );
  }

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default"><Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1C2421"/></Style>
  <Style ss:ID="sBanner"><Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#F7F4EE"/><Interior ss:Color="#1F5C57" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:Horizontal="Left"/></Style>
  <Style ss:ID="sTitle"><Font ss:FontName="Calibri" ss:Size="13" ss:Bold="1" ss:Color="#1C2421"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sSub"><Font ss:FontName="Calibri" ss:Size="9" ss:Color="#5C6560"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sHead"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#F7F4EE"/><Interior ss:Color="#1F5C57" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#163E3B"/></Borders></Style>
  <Style ss:ID="sSection"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#1F5C57"/><Interior ss:Color="#E7EFEA" ss:Pattern="Solid"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sStation"><Font ss:FontName="Calibri" ss:Size="9" ss:Bold="1" ss:Color="#1C2421"/><Interior ss:Color="#F3EFE6" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D4CFC4"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E4DFD4"/></Borders></Style>
  <Style ss:ID="sBody"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E4DFD4"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#EEEAE2"/></Borders></Style>
  <Style ss:ID="sEve"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Interior ss:Color="#EEF3F1" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D4CFC4"/></Borders></Style>
  <Style ss:ID="sLeave"><Font ss:FontName="Calibri" ss:Size="9" ss:Color="#6B3F1F"/><Interior ss:Color="#F4E6D8" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sHoliday"><Font ss:FontName="Calibri" ss:Size="9" ss:Italic="1" ss:Color="#7A7468"/><Interior ss:Color="#EDE8DC" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:Horizontal="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sNotes"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Alignment ss:Vertical="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sBlank"/>
 </Styles>
 <Worksheet ss:Name="Roster">
  <Table ss:ExpandedColumnCount="6" x:FullColumns="1" x:FullRows="1">
   <Column ss:Width="160"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   ${rows.join("\n   ")}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout x:Orientation="Landscape"/>
    <Header x:Margin="0.2"/>
    <Footer x:Margin="0.2" x:Data="&amp;C${xmlEscape(week.title)}"/>
    <PageMargins x:Bottom="0.3" x:Left="0.3" x:Right="0.3" x:Top="0.3"/>
   </PageSetup>
   <FitToPage/>
   <Print><ValidPrinterInfo/><FitToPage/><FitWidth>1</FitWidth><FitHeight>1</FitHeight></Print>
  </WorksheetOptions>
 </Worksheet>
 <Worksheet ss:Name="By person">
  <Table>
   <Column ss:Width="180"/>
   <Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/>
   ${personRows.join("\n   ")}
  </Table>
 </Worksheet>
 <Worksheet ss:Name="Coverage">
  <Table>
   <Column ss:Width="70"/><Column ss:Width="90"/><Column ss:Width="520"/>
   ${issueRows.join("\n   ")}
  </Table>
 </Worksheet>
 <Worksheet ss:Name="Staff">
  <Table>
   <Column ss:Width="160"/><Column ss:Width="70"/><Column ss:Width="90"/><Column ss:Width="70"/><Column ss:Width="360"/>
   ${staffRows.join("\n   ")}
  </Table>
 </Worksheet>
</Workbook>`;
}

export function downloadRosterExcel(week: WeekRoster, staff: StaffMember[]) {
  const xml = rosterToSpreadsheetXml(week, staff);
  const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${week.title}.xls`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadJson(week: WeekRoster) {
  const blob = new Blob([JSON.stringify(week, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${week.title}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
