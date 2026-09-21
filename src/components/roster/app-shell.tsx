import { useMemo, useState } from "react";
import { FlaskConical, Menu, Users } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Toolbar } from "./toolbar";
import { RosterGrid } from "./roster-grid";
import { StaffList } from "./staff-panel";
import { CoverageBar, CoverageList } from "./coverage-panel";
import { Insights } from "./insights";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { currentWeek, useRosterStore } from "@/lib/roster/store";
import { validateWeek } from "@/lib/roster/validate";
import { ARCHIVE } from "@/lib/roster/archive";
import { DAYS } from "@/lib/roster/types";
import { STATIONS } from "@/lib/roster/stations";
import { cn } from "@/lib/utils";

export function AppShell() {
  const staff = useRosterStore((s) => s.staff);
  const week = useRosterStore((s) => currentWeek(s));
  const selectedStaffId = useRosterStore((s) => s.selectedStaffId);
  const shiftWeek = useRosterStore((s) => s.shiftWeek);
  const setCell = useRosterStore((s) => s.setCell);
  const setLeave = useRosterStore((s) => s.setLeave);
  const generate = useRosterStore((s) => s.generate);
  const resetWeek = useRosterStore((s) => s.resetWeek);
  const copyFrom = useRosterStore((s) => s.copyFrom);
  const restoreArchive = useRosterStore((s) => s.restoreArchive);
  const setSelectedStaff = useRosterStore((s) => s.setSelectedStaff);
  const updateNotes = useRosterStore((s) => s.updateNotes);

  const [staffOpen, setStaffOpen] = useState(false);
  const [mobileDay, setMobileDay] = useState(0);
  const [confirmGen, setConfirmGen] = useState(false);
  const issues = useMemo(() => validateWeek(week, staff), [week, staff]);
  const isArchive = ARCHIVE.some((w) => w.monday === week.monday);
  const hasAssignments = STATIONS.some((st) => (week.cells[st.id] ?? []).some((c) => c.length));

  const runGenerate = () => {
    generate();
    setConfirmGen(false);
    toast.success("Week generated from the 16-week pattern set. Tweak any cell.");
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Toaster position="bottom-right" richColors />
      <header className="border-b border-border bg-card/80 print:hidden">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FlaskConical className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-none">Biochem Roster</p>
              <p className="text-[11px] text-muted-foreground">cobas Pro · c513 · Alinity · EPP</p>
            </div>
          </div>
          <Button variant="outline" className="lg:hidden" onClick={() => setStaffOpen(true)}>
            <Users />
            Staff
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Toolbar
            week={week}
            staff={staff}
            onPrev={() => shiftWeek(-1)}
            onNext={() => shiftWeek(1)}
            onGenerate={() => (hasAssignments ? setConfirmGen(true) : runGenerate())}
            onReset={() => {
              resetWeek();
              toast("Benches cleared. Leave kept.");
            }}
            onCopy={(m) => {
              copyFrom(m);
              toast.success("Copied previous week, skipping anyone on leave.");
            }}
            onRestore={(m) => {
              restoreArchive(m);
              toast.success("Loaded a supplied roster.");
            }}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <CoverageBar issues={issues} />
            {isArchive ? (
              <p className="text-xs text-muted-foreground">Loaded from a supplied June–September 2026 roster.</p>
            ) : (
              <p className="text-xs text-muted-foreground">Working week — generate, copy, or fill cell by cell.</p>
            )}
          </div>

          <div className="mt-3 flex gap-1 overflow-x-auto print:hidden lg:hidden">
            {DAYS.map((d, i) => (
              <button
                key={d}
                type="button"
                onClick={() => setMobileDay(i)}
                className={cn(
                  "h-10 min-w-14 shrink-0 rounded-md px-3 text-sm font-medium",
                  mobileDay === i ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border",
                )}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="lg:hidden">
              <RosterGrid
                week={week}
                staff={staff}
                selectedStaffId={selectedStaffId}
                onChange={setCell}
                onLeave={setLeave}
                visibleDays={[mobileDay]}
              />
            </div>
            <div className="hidden lg:block">
              <RosterGrid
                week={week}
                staff={staff}
                selectedStaffId={selectedStaffId}
                onChange={setCell}
                onLeave={setLeave}
                visibleDays={[0, 1, 2, 3, 4]}
              />
            </div>
            <div className="hidden print:block">
              <RosterGrid
                week={week}
                staff={staff}
                selectedStaffId={selectedStaffId}
                onChange={setCell}
                onLeave={setLeave}
                visibleDays={[0, 1, 2, 3, 4]}
              />
            </div>
          </div>

          <label className="mt-4 block print:hidden">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Week notes
            </span>
            <textarea
              value={week.notes}
              onChange={(e) => updateNotes(e.target.value)}
              rows={2}
              placeholder="Tea room duty, stocktake, IANZ, lunch and learn…"
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
            />
          </label>
        </div>

        <aside className="hidden print:hidden lg:block">
          <div className="sticky top-4 rounded-xl border border-border bg-card p-4">
            <Tabs defaultValue="staff">
              <TabsList className="w-full">
                <TabsTrigger value="staff" className="flex-1">
                  Staff
                </TabsTrigger>
                <TabsTrigger value="check" className="flex-1">
                  Check
                </TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">
                  Patterns
                </TabsTrigger>
              </TabsList>
              <TabsContent value="staff" className="h-[calc(100svh-11rem)]">
                <StaffList
                  staff={staff}
                  week={week}
                  selectedStaffId={selectedStaffId}
                  onSelect={setSelectedStaff}
                  onLeave={setLeave}
                />
              </TabsContent>
              <TabsContent value="check" className="max-h-[calc(100svh-11rem)] overflow-y-auto">
                <CoverageList issues={issues} />
              </TabsContent>
              <TabsContent value="rules" className="max-h-[calc(100svh-11rem)] overflow-y-auto">
                <Insights />
              </TabsContent>
            </Tabs>
          </div>
        </aside>
      </main>

      <Sheet open={staffOpen} onOpenChange={setStaffOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Menu className="size-4" /> People
            </SheetTitle>
          </SheetHeader>
          <Tabs defaultValue="staff" className="min-h-0 flex-1 overflow-hidden">
            <TabsList className="w-full">
              <TabsTrigger value="staff" className="flex-1">
                Staff
              </TabsTrigger>
              <TabsTrigger value="check" className="flex-1">
                Check
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex-1">
                Patterns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="staff" className="h-[calc(100svh-8rem)]">
              <StaffList
                staff={staff}
                week={week}
                selectedStaffId={selectedStaffId}
                onSelect={setSelectedStaff}
                onLeave={setLeave}
              />
            </TabsContent>
            <TabsContent value="check" className="overflow-y-auto">
              <CoverageList issues={issues} />
            </TabsContent>
            <TabsContent value="rules" className="overflow-y-auto">
              <Insights />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <Dialog open={confirmGen} onOpenChange={setConfirmGen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace this week?</DialogTitle>
            <DialogDescription>
              Generate will overwrite bench assignments for {week.title}. Leave already marked is kept. You can still load a supplied roster afterwards.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmGen(false)}>
              Cancel
            </Button>
            <Button onClick={runGenerate}>Generate</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
