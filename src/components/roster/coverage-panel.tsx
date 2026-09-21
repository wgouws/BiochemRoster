import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { CoverageIssue } from "@/lib/roster/types";
import { DAYS } from "@/lib/roster/types";
import { issueCounts } from "@/lib/roster/validate";
import { cn } from "@/lib/utils";

export function CoverageBar({ issues }: { issues: CoverageIssue[] }) {
  const c = issueCounts(issues);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", c.error ? "bg-red-100 text-red-800" : "bg-muted text-muted-foreground")}>
        {c.error} holes
      </span>
      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", c.warn ? "bg-amber-100 text-amber-900" : "bg-muted text-muted-foreground")}>
        {c.warn} warnings
      </span>
      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{c.info} notes</span>
    </div>
  );
}

export function CoverageList({ issues }: { issues: CoverageIssue[] }) {
  if (!issues.length) {
    return <p className="text-sm text-muted-foreground">This week has no coverage issues.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {issues.slice(0, 40).map((i, idx) => (
        <li key={idx} className="flex gap-2 text-sm">
          {i.level === "error" ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-700" />
          ) : i.level === "warn" ? (
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
          ) : (
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          )}
          <span>
            <span className="font-medium">{DAYS[i.day]}.</span> {i.message}
          </span>
        </li>
      ))}
    </ul>
  );
}
