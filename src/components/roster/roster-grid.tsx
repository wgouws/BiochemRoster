import { DAY_FULL, DAYS, type Assignment, type StaffMember, type Station, type WeekRoster } from "@/lib/roster/types";
import { DAY_STATIONS, EVENING_STATIONS } from "@/lib/roster/stations";
import { holidayName } from "@/lib/roster/holidays";
import { weekdayISO } from "@/lib/roster/dates";
import { CellEditor } from "./cell-editor";
import { staffById } from "@/lib/roster/staff";
import { cn } from "@/lib/utils";

function StationRow({
  station,
  week,
  staff,
  selectedStaffId,
  onChange,
  evening,
  visibleDays,
}: {
  station: Station;
  week: WeekRoster;
  staff: StaffMember[];
  selectedStaffId: string | null;
  onChange: (stationId: string, day: number, next: Assignment[]) => void;
  evening?: boolean;
  visibleDays: number[];
}) {
  return (
    <tr className={cn(evening ? "bg-eve/40" : "odd:bg-row")}>
      <th className="sticky left-0 z-10 w-32 border-b border-r border-border bg-inherit px-2 py-1.5 text-left align-top sm:w-40 sm:px-2.5">
        <div className="text-[12px] font-semibold leading-tight text-foreground">{station.label}</div>
        {station.sublabel ? (
          <div className="mt-0.5 hidden text-[10px] leading-snug text-muted-foreground sm:block">{station.sublabel}</div>
        ) : null}
      </th>
      {DAYS.map((_, d) => {
        if (!visibleDays.includes(d)) return null;
        const holiday = week.holidays.includes(d);
        return (
          <td key={station.id + d} className="border-b border-border p-0 align-top">
            <CellEditor
              assignments={week.cells[station.id]?.[d] ?? []}
              staff={staff}
              selectedStaffId={selectedStaffId}
              holiday={holiday}
              ariaLabel={`${station.label} ${DAY_FULL[d]}`}
              onChange={(next) => onChange(station.id, d, next)}
            />
          </td>
        );
      })}
    </tr>
  );
}

export function RosterGrid({
  week,
  staff,
  selectedStaffId,
  onChange,
  onLeave,
  visibleDays,
}: {
  week: WeekRoster;
  staff: StaffMember[];
  selectedStaffId: string | null;
  onChange: (stationId: string, day: number, next: Assignment[]) => void;
  onLeave: (staffId: string, day: number, note: string | null) => void;
  visibleDays: number[];
}) {
  return (
    <div className="overflow-auto rounded-lg border border-border bg-card shadow-[0_1px_0_rgba(28,36,33,0.04)]">
      <table className="w-full min-w-0 border-collapse text-sm lg:min-w-[860px]">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="sticky left-0 z-20 w-32 bg-primary px-2 py-2 text-left text-[11px] font-semibold uppercase tracking-wider sm:w-40 sm:px-2.5">
              Station
            </th>
            {DAYS.map((d, i) => {
              if (!visibleDays.includes(i)) return null;
              const iso = weekdayISO(week.monday, i);
              const hol = holidayName(iso);
              return (
                <th key={d} className="min-w-[140px] px-2 py-2 text-center text-[12px] font-semibold">
                  <div>{DAY_FULL[i]}</div>
                  {hol ? <div className="text-[10px] font-normal opacity-80">{hol}</div> : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={1 + visibleDays.length}
              className="bg-section px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
            >
              Day benches · 08:30 – 17:00
            </td>
          </tr>
          {DAY_STATIONS.map((st) => (
            <StationRow
              key={st.id}
              station={st}
              week={week}
              staff={staff}
              selectedStaffId={selectedStaffId}
              onChange={onChange}
              visibleDays={visibleDays}
            />
          ))}
          <tr className="bg-leave/40">
            <th className="sticky left-0 z-10 border-b border-r border-border bg-leave/40 px-2 py-2 text-left text-[12px] font-semibold sm:px-2.5">
              Leave
            </th>
            {DAYS.map((_, d) => {
              if (!visibleDays.includes(d)) return null;
              const people = Object.entries(week.leave)
                .map(([id, slots]) => ({ id, note: slots[d] }))
                .filter((x) => x.note);
              return (
                <td key={"leave" + d} className="border-b border-border px-1.5 py-1.5 align-top">
                  <div className="flex flex-col gap-1">
                    {people.map((p) => {
                      const s = staffById(staff, p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className="rounded-sm bg-leave px-1.5 py-0.5 text-left text-[11px] text-leave-fg"
                          onClick={() => onLeave(p.id, d, null)}
                          title="Click to remove leave"
                        >
                          {s?.rosterName ?? p.id}
                          {p.note && p.note !== "Leave" ? ` – ${p.note}` : ""}
                        </button>
                      );
                    })}
                    <LeaveAdd staff={staff} day={d} week={week} onLeave={onLeave} />
                  </div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td
              colSpan={1 + visibleDays.length}
              className="bg-section px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
            >
              Evening · 14:00 – 22:00
            </td>
          </tr>
          {EVENING_STATIONS.map((st) => (
            <StationRow
              key={st.id}
              station={st}
              week={week}
              staff={staff}
              selectedStaffId={selectedStaffId}
              onChange={onChange}
              evening
              visibleDays={visibleDays}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeaveAdd({
  staff,
  day,
  week,
  onLeave,
}: {
  staff: StaffMember[];
  day: number;
  week: WeekRoster;
  onLeave: (staffId: string, day: number, note: string | null) => void;
}) {
  return (
    <select
      className="h-8 w-full rounded-sm border border-dashed border-border bg-transparent text-[11px] text-muted-foreground"
      defaultValue=""
      onChange={(e) => {
        if (e.target.value) onLeave(e.target.value, day, "Leave");
        e.target.value = "";
      }}
      aria-label={`Add leave ${DAY_FULL[day]}`}
    >
      <option value="">Add leave</option>
      {staff
        .filter((s) => s.active && s.role !== "pathologist")
        .filter((s) => !week.leave[s.id]?.[day])
        .map((s) => (
          <option key={s.id} value={s.id}>
            {s.rosterName}
          </option>
        ))}
    </select>
  );
}
