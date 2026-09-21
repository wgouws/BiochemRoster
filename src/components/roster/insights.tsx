import { DAYS } from "@/lib/roster/types";
import { stationById } from "@/lib/roster/stations";
import { staffName, topPatterns } from "@/lib/roster/patterns";

export function Insights() {
  const patterns = topPatterns(18);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-display text-base font-semibold">Learned from your rosters</h2>
        <p className="text-xs text-muted-foreground">
          Sixteen weeks (1 June – 19 September 2026). Slots above 70% consistency are treated as locked templates when generating. Loraine, Shamsia and Gordon were added from the documents (they were not on the staff list you typed).
        </p>
      </div>
      <ul className="flex flex-col gap-1.5">
        {patterns.map((p) => {
          const st = stationById(p.stationId);
          return (
            <li
              key={`${p.stationId}-${p.day}-${p.staffId}`}
              className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-2 rounded-md px-1 py-1 text-sm"
            >
              <span className="text-xs text-muted-foreground">
                {DAYS[p.day]} {st?.label}
              </span>
              <span className="truncate font-medium">{staffName(p.staffId)}</span>
              <span className="tabular-nums text-xs text-muted-foreground">
                {p.count}/{p.total} · {Math.round(p.pct * 100)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
