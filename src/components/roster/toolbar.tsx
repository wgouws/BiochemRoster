import { CalendarPlus, ChevronLeft, ChevronRight, Copy, Download, Eraser, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ARCHIVE } from "@/lib/roster/archive";
import { shiftToMonday, weekRangeLabel } from "@/lib/roster/dates";
import { downloadJson, downloadRosterExcel } from "@/lib/roster/excel";
import type { StaffMember, WeekRoster } from "@/lib/roster/types";

export function Toolbar({
  week,
  staff,
  onPrev,
  onNext,
  onGenerate,
  onReset,
  onCopy,
  onRestore,
}: {
  week: WeekRoster;
  staff: StaffMember[];
  onPrev: () => void;
  onNext: () => void;
  onGenerate: () => void;
  onReset: () => void;
  onCopy: (monday: string) => void;
  onRestore: (monday: string) => void;
}) {
  const prevMonday = shiftToMonday(week.monday, -1);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Biochemistry laboratory</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">
          {week.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Early 08:00–16:30 · day 08:30–17:00 · evening 14:00–22:00
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <div className="flex items-center rounded-lg border border-border bg-card">
          <Button variant="ghost" size="icon" className="size-10" onClick={onPrev} aria-label="Previous week">
            <ChevronLeft />
          </Button>
          <span className="min-w-36 px-2 text-center text-sm font-medium">{weekRangeLabel(week.monday)}</span>
          <Button variant="ghost" size="icon" className="size-10" onClick={onNext} aria-label="Next week">
            <ChevronRight />
          </Button>
        </div>
        <Button onClick={onGenerate}>
          <CalendarPlus />
          Generate week
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Copy />
              Copy / archive
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
            <DropdownMenuLabel>Build from</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(prevMonday)}>Previous week</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Supplied rosters</DropdownMenuLabel>
            {ARCHIVE.map((w) => (
              <DropdownMenuItem key={w.monday} onClick={() => onRestore(w.monday)}>
                {w.title.replace("Roster ", "")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" onClick={() => downloadRosterExcel(week, staff)}>
          <Download />
          Excel
        </Button>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer />
          Print
        </Button>
        <Button variant="ghost" onClick={() => downloadJson(week)} className="hidden sm:inline-flex">
          JSON
        </Button>
        <Button variant="ghost" onClick={onReset}>
          <Eraser />
          Clear benches
        </Button>
      </div>
    </div>
  );
}
