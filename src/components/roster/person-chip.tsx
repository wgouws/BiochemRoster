import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Assignment, StaffMember } from "@/lib/roster/types";
import { staffById } from "@/lib/roster/staff";

export function PersonChip({
  assignment,
  staff,
  selected,
  onRemove,
  compact,
}: {
  assignment: Assignment;
  staff: StaffMember[];
  selected?: boolean;
  onRemove?: () => void;
  compact?: boolean;
}) {
  const person = staffById(staff, assignment.staffId);
  const name = person?.rosterName ?? assignment.staffId;
  const color = person?.color ?? "#5c6560";
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-sm border px-1.5 py-0.5 text-left leading-tight",
        compact ? "text-[11px]" : "text-xs",
        selected ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : "",
      )}
      style={{
        background: `color-mix(in oklab, ${color} 16%, white)`,
        borderColor: `color-mix(in oklab, ${color} 35%, white)`,
        color: color,
      }}
    >
      <span className="truncate font-medium">
        {name}
        {assignment.note ? <span className="font-normal opacity-80"> · {assignment.note}</span> : null}
      </span>
      {onRemove ? (
        <button
          type="button"
          className="rounded-sm p-0.5 hover:bg-black/10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${name}`}
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  );
}
