import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PersonChip } from "./person-chip";
import type { Assignment, StaffMember } from "@/lib/roster/types";
import { cn } from "@/lib/utils";

const NOTE_PRESETS = ["am", "pm", "all day", "2pm", "5pm", "1630", "Animals", "IVF", "cover"];

export function CellEditor({
  assignments,
  staff,
  selectedStaffId,
  holiday,
  onChange,
  ariaLabel,
}: {
  assignments: Assignment[];
  staff: StaffMember[];
  selectedStaffId: string | null;
  holiday?: boolean;
  onChange: (next: Assignment[]) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff
      .filter((s) => s.active)
      .filter((s) => {
        if (!q) return true;
        return (
          s.rosterName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.initials.toLowerCase().includes(q)
        );
      });
  }, [staff, query]);

  const grouped = {
    scientist: filtered.filter((s) => s.role === "scientist"),
    technician: filtered.filter((s) => s.role === "technician"),
    other: filtered.filter((s) => s.role !== "scientist" && s.role !== "technician"),
  };

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setQuery("");
          setNote("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            "flex min-h-14 w-full flex-col items-start gap-1 rounded-sm px-1.5 py-1.5 text-left transition-colors hover:bg-muted/70",
            holiday ? "bg-holiday/60" : "bg-transparent",
            assignments.length === 0 ? "text-muted-foreground" : "",
          )}
        >
          {holiday && assignments.length === 0 ? (
            <span className="text-[11px] italic">Holiday</span>
          ) : assignments.length === 0 ? (
            <span className="text-[11px]">Add</span>
          ) : (
            assignments.map((a) => (
              <PersonChip
                key={a.staffId + (a.note ?? "")}
                assignment={a}
                staff={staff}
                selected={selectedStaffId === a.staffId}
                compact
              />
            ))
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="border-b border-border p-3">
          <Input
            autoFocus
            placeholder="Search staff"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {NOTE_PRESETS.map((n) => (
              <button
                key={n}
                type="button"
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px]",
                  note === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
                )}
                onClick={() => setNote(note === n ? "" : n)}
              >
                {n}
              </button>
            ))}
          </div>
          <Input
            className="mt-2 h-8"
            placeholder="Custom note (am / pm / 5pm)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {assignments.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-1 px-1">
              {assignments.map((a) => (
                <PersonChip
                  key={a.staffId + (a.note ?? "")}
                  assignment={a}
                  staff={staff}
                  onRemove={() => onChange(assignments.filter((x) => x !== a))}
                />
              ))}
            </div>
          ) : null}
          {(["scientist", "technician", "other"] as const).map((g) =>
            grouped[g].length ? (
              <div key={g} className="mb-2">
                <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {g === "other" ? "Student / other" : g}
                </p>
                {grouped[g].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                    onClick={() => {
                      onChange([...assignments.filter((a) => a.staffId !== s.id), { staffId: s.id, note: note || undefined }]);
                      setQuery("");
                    }}
                  >
                    <span>
                      {s.rosterName}
                      {s.lastName ? ` ${s.lastName}` : ""}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{s.initials}</span>
                  </button>
                ))}
              </div>
            ) : null,
          )}
        </div>
        <div className="flex justify-between border-t border-border p-2">
          <Button variant="ghost" size="sm" onClick={() => onChange([])}>
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
