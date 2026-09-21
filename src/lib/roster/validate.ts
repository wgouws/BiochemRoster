import { DAYS, type CoverageIssue, type StaffMember, type WeekRoster } from "./types";
import { STATIONS } from "./stations";
import { holidayName } from "./holidays";
import { weekdayISO } from "./dates";

const EXCLUSIVE = new Set(STATIONS.filter((s) => s.exclusive).map((s) => s.id));
const OVERLAY = new Set(["early", "val", "epp1", "epp2", "admin", "cobas_n1", "cobas_n2", "send_eve", "pvt9", "pvt7"]);

export function validateWeek(week: WeekRoster, staff: StaffMember[]): CoverageIssue[] {
  const issues: CoverageIssue[] = [];
  const byId = new Map(staff.map((s) => [s.id, s]));

  for (let d = 0; d < 5; d++) {
    const date = weekdayISO(week.monday, d);
    const holiday = holidayName(date);
    if (week.holidays.includes(d) || holiday) {
      issues.push({
        level: "info",
        day: d,
        message: `${DAYS[d]} is ${holiday ?? "a holiday"} — day benches can stay empty.`,
      });
      continue;
    }

    const primary = new Map<string, string[]>();

    for (const station of STATIONS) {
      if (station.retired) continue;
      const cell = week.cells[station.id]?.[d] ?? [];
      for (const a of cell) {
        if (!byId.has(a.staffId)) {
          issues.push({
            level: "warn",
            day: d,
            stationId: station.id,
            staffId: a.staffId,
            message: `Unknown person '${a.staffId}' on ${station.label}.`,
          });
        }
        const leaveNote = week.leave[a.staffId]?.[d];
        if (leaveNote) {
          issues.push({
            level: "error",
            day: d,
            stationId: station.id,
            staffId: a.staffId,
            message: `${byId.get(a.staffId)?.rosterName ?? a.staffId} is on leave (${leaveNote}) but assigned to ${station.label}.`,
          });
        }
        if (station.requiresScientist) {
          const s = byId.get(a.staffId);
          if (s && s.role !== "scientist" && s.role !== "pathologist") {
            issues.push({
              level: "warn",
              day: d,
              stationId: station.id,
              staffId: a.staffId,
              message: `${s.rosterName} is a ${s.role} on ${station.label}, which is usually a scientist.`,
            });
          }
        }
        if (EXCLUSIVE.has(station.id) && !OVERLAY.has(station.id)) {
          const list = primary.get(a.staffId) ?? [];
          list.push(station.id);
          primary.set(a.staffId, list);
        }
      }

      if (cell.length < station.min) {
        issues.push({
          level: cell.length === 0 ? "error" : "warn",
          day: d,
          stationId: station.id,
          message:
            cell.length === 0
              ? `${station.label} is empty on ${DAYS[d]}.`
              : `${station.label} has ${cell.length} on ${DAYS[d]} (needs ${station.min}).`,
        });
      }
    }

    for (const [staffId, stations] of primary) {
      const unique = [...new Set(stations)];
      if (unique.length > 1) {
        const names = unique.map((id) => STATIONS.find((s) => s.id === id)?.label ?? id);
        const person = byId.get(staffId)?.rosterName ?? staffId;
        const split = unique.every((id) =>
          (week.cells[id]?.[d] ?? []).some((a) => a.staffId === staffId && a.note),
        );
        issues.push({
          level: split ? "info" : "warn",
          day: d,
          staffId,
          message: split
            ? `${person} is split across ${names.join(" / ")} on ${DAYS[d]}.`
            : `${person} is on ${names.join(" and ")} on ${DAYS[d]} with no am/pm note.`,
        });
      }
    }

    for (const s of staff) {
      if (!s.active || !s.autoAssign || s.eveningOnly || s.role === "pathologist") continue;
      if (week.leave[s.id]?.[d]) continue;
      const assigned = STATIONS.some((st) =>
        (week.cells[st.id]?.[d] ?? []).some((a) => a.staffId === s.id),
      );
      if (!assigned) {
        issues.push({
          level: "warn",
          day: d,
          staffId: s.id,
          message: `${s.rosterName} is working ${DAYS[d]} but has no station.`,
        });
      }
    }
  }

  return issues;
}

export function issueCounts(issues: CoverageIssue[]) {
  return {
    error: issues.filter((i) => i.level === "error").length,
    warn: issues.filter((i) => i.level === "warn").length,
    info: issues.filter((i) => i.level === "info").length,
  };
}
