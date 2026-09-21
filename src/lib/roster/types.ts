export type Role = "scientist" | "technician" | "student" | "pathologist" | "casual";
export type Fte = "full" | "part";

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: Role;
  fte: Fte;
  specialist?: "immunology" | "epp";
  /** Shown on the printed roster (usually first name). */
  rosterName: string;
  color: string;
  /** Include in auto-generate. Evening-only / students / casuals default false. */
  autoAssign: boolean;
  /** Prefer morning-only assignments. */
  morningsOnly?: boolean;
  /** Evening PVT only, etc. */
  eveningOnly?: boolean;
  notes?: string;
  active: boolean;
}

export interface Assignment {
  staffId: string;
  note?: string;
}

export type DayIndex = 0 | 1 | 2 | 3 | 4;

export interface Station {
  id: string;
  label: string;
  sublabel?: string;
  section: "day" | "evening" | "meta";
  /** Primary bench — a person should hold at most one of these per day. */
  exclusive?: boolean;
  requiresScientist?: boolean;
  min: number;
  max: number;
  retired?: boolean;
}

export interface WeekRoster {
  monday: string;
  title: string;
  notes: string;
  /** Per-station, 5 weekday cells. */
  cells: Record<string, Assignment[][]>;
  /** staffId -> 5 slots (empty string = not on leave). */
  leave: Record<string, string[]>;
  /** Day indexes that are public holidays. */
  holidays: number[];
}

export interface CoverageIssue {
  level: "error" | "warn" | "info";
  day: number;
  stationId?: string;
  staffId?: string;
  message: string;
}

export interface PatternStat {
  stationId: string;
  day: number;
  staffId: string;
  count: number;
  total: number;
  pct: number;
}

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
