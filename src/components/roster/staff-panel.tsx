import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { displayName } from "@/lib/roster/staff";
import { DAYS, type StaffMember, type WeekRoster } from "@/lib/roster/types";
import { DAY_STATIONS, EVENING_STATIONS } from "@/lib/roster/stations";
import { cn } from "@/lib/utils";

export function StaffList({
  staff,
  week,
  selectedStaffId,
  onSelect,
  onLeave,
}: {
  staff: StaffMember[];
  week: WeekRoster;
  selectedStaffId: string | null;
  onSelect: (id: string | null) => void;
  onLeave: (staffId: string, day: number, note: string | null) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = staff.filter((s) => {
    if (!s.active) return false;
    if (!q.trim()) return true;
    const hay = `${s.firstName} ${s.lastName} ${s.initials} ${s.role}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const selected = staff.find((s) => s.id === selectedStaffId);

  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <h2 className="font-display text-base font-semibold">Staff</h2>
        <p className="text-xs text-muted-foreground">Select a person to highlight them on the grid.</p>
      </div>
      <Input placeholder="Find a person" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {(["scientist", "technician", "student", "casual", "pathologist"] as const).map((role) => {
          const group = filtered.filter((s) => s.role === role);
          if (!group.length) return null;
          return (
            <div key={role} className="mb-3">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{role}</p>
              {group.map((s) => {
                const leaveDays = (week.leave[s.id] ?? []).filter(Boolean).length;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelect(selectedStaffId === s.id ? null : s.id)}
                    className={cn(
                      "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                      selectedStaffId === s.id ? "bg-muted" : "",
                    )}
                  >
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="min-w-0 flex-1 truncate">
                      {s.rosterName}
                      <span className="text-muted-foreground"> {s.initials}</span>
                    </span>
                    {leaveDays ? (
                      <span className="text-[10px] text-leave-fg">{leaveDays} leave</span>
                    ) : (
                      <span className="text-[10px] uppercase text-muted-foreground">{s.fte}</span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      {selected ? (
        <PersonWeek person={selected} week={week} onLeave={onLeave} onClear={() => onSelect(null)} />
      ) : null}
    </div>
  );
}

function PersonWeek({
  person,
  week,
  onLeave,
  onClear,
}: {
  person: StaffMember;
  week: WeekRoster;
  onLeave: (staffId: string, day: number, note: string | null) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{displayName(person)}</p>
          <p className="text-xs text-muted-foreground">
            {person.role} · {person.fte}-time
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
      <ul className="flex flex-col gap-1.5 text-xs">
        {DAYS.map((d, i) => {
          const leave = week.leave[person.id]?.[i];
          const hits: string[] = [];
          for (const st of [...DAY_STATIONS, ...EVENING_STATIONS]) {
            for (const a of week.cells[st.id]?.[i] ?? []) {
              if (a.staffId === person.id) hits.push(a.note ? `${st.label} (${a.note})` : st.label);
            }
          }
          return (
            <li key={d} className="grid grid-cols-[2rem_1fr_auto] items-start gap-2">
              <span className="font-medium text-muted-foreground">{d}</span>
              <span className={leave ? "text-leave-fg" : ""}>
                {leave ? `Leave${leave !== "Leave" ? ` – ${leave}` : ""}` : hits.join(" · ") || "—"}
              </span>
              <button
                type="button"
                className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
                onClick={() => onLeave(person.id, i, leave ? null : "Leave")}
              >
                {leave ? "Work" : "Leave"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
