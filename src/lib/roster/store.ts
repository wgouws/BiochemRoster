import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STAFF } from "./staff";
import { ARCHIVE, archiveByMonday } from "./archive";
import { emptyCells } from "./stations";
import { generateWeek, copyAssignments } from "./generate";
import { weekHolidays, weekTitle, shiftToMonday, mondayOf, toISODate } from "./dates";
import type { Assignment, StaffMember, WeekRoster } from "./types";

function blankWeek(monday: string): WeekRoster {
  return {
    monday,
    title: weekTitle(monday),
    notes: "",
    cells: emptyCells(),
    leave: {},
    holidays: weekHolidays(monday),
  };
}

function ensureWeek(weeks: Record<string, WeekRoster>, monday: string): WeekRoster {
  return weeks[monday] ?? blankWeek(monday);
}

interface RosterState {
  staff: StaffMember[];
  weeks: Record<string, WeekRoster>;
  currentMonday: string;
  selectedStaffId: string | null;
  setMonday: (monday: string) => void;
  shiftWeek: (delta: number) => void;
  updateNotes: (notes: string) => void;
  setCell: (stationId: string, day: number, assignments: Assignment[]) => void;
  addToCell: (stationId: string, day: number, assignment: Assignment) => void;
  removeFromCell: (stationId: string, day: number, staffId: string) => void;
  setLeave: (staffId: string, day: number, note: string | null) => void;
  generate: () => void;
  copyFrom: (sourceMonday: string) => void;
  resetWeek: () => void;
  restoreArchive: (monday: string) => void;
  setSelectedStaff: (id: string | null) => void;
  upsertStaff: (member: StaffMember) => void;
  importWeek: (week: WeekRoster) => void;
}

const seeded = archiveByMonday();
const latestArchive = ARCHIVE[ARCHIVE.length - 1]?.monday ?? toISODate(mondayOf(new Date()));

export const useRosterStore = create<RosterState>()(
  persist(
    (set, get) => ({
      staff: STAFF.map((s) => ({ ...s })),
      weeks: seeded,
      currentMonday: latestArchive,
      selectedStaffId: null,

      setMonday: (monday) =>
        set((state) => ({
          currentMonday: monday,
          weeks: state.weeks[monday] ? state.weeks : { ...state.weeks, [monday]: blankWeek(monday) },
        })),

      shiftWeek: (delta) => {
        const next = shiftToMonday(get().currentMonday, delta);
        get().setMonday(next);
      },

      updateNotes: (notes) =>
        set((state) => {
          const week = { ...ensureWeek(state.weeks, state.currentMonday), notes };
          return { weeks: { ...state.weeks, [state.currentMonday]: week } };
        }),

      setCell: (stationId, day, assignments) =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const row = [...(prev.cells[stationId] ?? [[], [], [], [], []])];
          row[day] = assignments;
          const week = { ...prev, cells: { ...prev.cells, [stationId]: row } };
          return { weeks: { ...state.weeks, [state.currentMonday]: week } };
        }),

      addToCell: (stationId, day, assignment) =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const row = [...(prev.cells[stationId] ?? [[], [], [], [], []])];
          const cell = [...(row[day] ?? [])];
          if (!cell.some((a) => a.staffId === assignment.staffId && a.note === assignment.note)) {
            cell.push(assignment);
          }
          row[day] = cell;
          const week = { ...prev, cells: { ...prev.cells, [stationId]: row } };
          return { weeks: { ...state.weeks, [state.currentMonday]: week } };
        }),

      removeFromCell: (stationId, day, staffId) =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const row = [...(prev.cells[stationId] ?? [[], [], [], [], []])];
          row[day] = (row[day] ?? []).filter((a) => a.staffId !== staffId);
          const week = { ...prev, cells: { ...prev.cells, [stationId]: row } };
          return { weeks: { ...state.weeks, [state.currentMonday]: week } };
        }),

      setLeave: (staffId, day, note) =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const leave = { ...prev.leave };
          const row = [...(leave[staffId] ?? ["", "", "", "", ""])];
          row[day] = note ?? "";
          if (row.every((x) => !x)) delete leave[staffId];
          else leave[staffId] = row;
          return { weeks: { ...state.weeks, [state.currentMonday]: { ...prev, leave } } };
        }),

      generate: () =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const generated = generateWeek(state.currentMonday, state.staff, { leave: prev.leave });
          generated.notes = prev.notes;
          return { weeks: { ...state.weeks, [state.currentMonday]: generated } };
        }),

      copyFrom: (sourceMonday) =>
        set((state) => {
          const src = state.weeks[sourceMonday];
          if (!src) return state;
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const copied = copyAssignments(src, state.currentMonday, prev.leave);
          return { weeks: { ...state.weeks, [state.currentMonday]: copied } };
        }),

      resetWeek: () =>
        set((state) => {
          const prev = ensureWeek(state.weeks, state.currentMonday);
          const week = blankWeek(state.currentMonday);
          week.leave = { ...prev.leave };
          week.notes = prev.notes;
          return { weeks: { ...state.weeks, [state.currentMonday]: week } };
        }),

      restoreArchive: (monday) =>
        set((state) => {
          const archived = ARCHIVE.find((w) => w.monday === monday);
          if (!archived) return state;
          return {
            currentMonday: monday,
            weeks: { ...state.weeks, [monday]: structuredClone(archived) },
          };
        }),

      setSelectedStaff: (id) => set({ selectedStaffId: id }),

      upsertStaff: (member) =>
        set((state) => {
          const idx = state.staff.findIndex((s) => s.id === member.id);
          const staff = [...state.staff];
          if (idx >= 0) staff[idx] = member;
          else staff.push(member);
          return { staff };
        }),

      importWeek: (week) =>
        set((state) => ({
          currentMonday: week.monday,
          weeks: { ...state.weeks, [week.monday]: week },
        })),
    }),
    {
      name: "biochem-roster-v1",
      partialize: (s) => ({
        staff: s.staff,
        weeks: s.weeks,
        currentMonday: s.currentMonday,
      }),
    },
  ),
);

export function currentWeek(state: RosterState): WeekRoster {
  return ensureWeek(state.weeks, state.currentMonday);
}
