import { ARCHIVE } from "./archive";
import { weekHolidays, weekTitle } from "./dates";
import { analysePatterns, affinityScore, noteAffinity, type SlotPattern } from "./patterns";
import { emptyCells, STATIONS } from "./stations";
import type { Assignment, StaffMember, WeekRoster } from "./types";

const SCIENTISTS = ["CS", "WG", "GL", "SM", "MW", "AW", "AD"];
const PRO1_ROTATION = ["CS", "WG", "SM", "MW", "GL", "AW"];
const EPP_POOL = ["VM", "LO", "SM", "GL", "RP", "AW", "KAH", "AL", "SG", "JD", "SS"];
const READERS_1 = ["SPM", "MW", "AW", "GL", "TW"];
const READERS_2 = ["AW", "TW", "AW", "AW", "TW"];

const EVENING_TEMPLATE: Record<string, { id: string; note?: string }[]> = {
  cobas_n1: [{ id: "GL" }, { id: "CS" }, { id: "WG" }, { id: "MW" }, { id: "SM" }],
  cobas_n2: [
    { id: "RP" },
    { id: "KAH" },
    { id: "JD" },
    { id: "GL" },
    { id: "SG", note: "1630" },
  ],
  send_eve: [
    { id: "KAH" },
    { id: "AD" },
    { id: "AL", note: "5pm" },
    { id: "AL" },
    { id: "LO" },
  ],
  pvt9: [{ id: "SS" }, { id: "DM" }, { id: "SH" }, { id: "SH" }, { id: "SH" }],
};

const EARLY_TEMPLATE = ["JD", "WG", "GL", "CS", "JD"];
const PVT_ERR_TEMPLATE = ["RP", "KAH", "JD", "GL", "SM"];

const PRIMARY_FILL_ORDER = [
  "pro1",
  "immuno_sci",
  "immuno_am",
  "epp",
  "pro2",
  "pro3",
  "c513",
  "alinity",
  "pvt_am",
  "pvt_err",
  "send",
  "pvt_pm",
];

function weekIndex(monday: string): number {
  const t = Date.parse(monday + "T00:00:00");
  const origin = Date.parse("2026-06-01T00:00:00");
  return Math.round((t - origin) / (7 * 24 * 3600 * 1000));
}

function cloneLeave(src: Record<string, string[]>): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(src)) out[k] = [...v];
  return out;
}

function onLeave(week: WeekRoster, id: string, day: number): boolean {
  return Boolean(week.leave[id]?.[day]);
}

function assignedPrimary(week: WeekRoster, id: string, day: number): boolean {
  return STATIONS.some(
    (s) =>
      s.exclusive &&
      (week.cells[s.id]?.[day] ?? []).some((a) => a.staffId === id),
  );
}

function assignedAnywhere(week: WeekRoster, id: string, day: number): boolean {
  return STATIONS.some((s) => (week.cells[s.id]?.[day] ?? []).some((a) => a.staffId === id));
}

function put(week: WeekRoster, stationId: string, day: number, a: Assignment) {
  const row = week.cells[stationId] ?? (week.cells[stationId] = [[], [], [], [], []]);
  if (!row[day].some((x) => x.staffId === a.staffId && x.note === a.note)) {
    row[day] = [...row[day], a];
  }
}

function pickAvailable(
  staff: StaffMember[],
  week: WeekRoster,
  day: number,
  ids: string[],
  opts?: { requireRole?: StaffMember["role"]; allowAssigned?: boolean },
): StaffMember | undefined {
  const byId = new Map(staff.map((s) => [s.id, s]));
  for (const id of ids) {
    const s = byId.get(id);
    if (!s || !s.active) continue;
    if (opts?.requireRole && s.role !== opts.requireRole) continue;
    if (onLeave(week, id, day)) continue;
    if (!opts?.allowAssigned && assignedPrimary(week, id, day)) continue;
    return s;
  }
  return undefined;
}

function rankCandidates(
  staff: StaffMember[],
  week: WeekRoster,
  stationId: string,
  day: number,
  patterns: SlotPattern[],
  extra?: (s: StaffMember) => number,
): StaffMember[] {
  const station = STATIONS.find((s) => s.id === stationId);
  return staff
    .filter((s) => {
      if (!s.active || !s.autoAssign) return false;
      if (onLeave(week, s.id, day)) return false;
      if (s.eveningOnly) return false;
      if (s.role === "pathologist") return false;
      if (station?.requiresScientist && s.role !== "scientist") return false;
      if (stationId === "immuno_sci" && s.specialist !== "immunology" && s.id !== "MW" && s.id !== "CS")
        return false;
      if (assignedPrimary(week, s.id, day)) return false;
      return true;
    })
    .map((s) => {
      let score = affinityScore(patterns, stationId, day, s.id) * 10;
      if (extra) score += extra(s);
      if (s.morningsOnly && (stationId === "pvt_pm" || stationId === "pvt_err")) score -= 5;
      if (s.specialist === "immunology" && stationId !== "immuno_sci" && stationId !== "immuno_am" && stationId !== "epp2")
        score -= 4;
      return { s, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}

export interface GenerateOptions {
  leave?: Record<string, string[]>;
  recent?: WeekRoster[];
}

export function generateWeek(
  monday: string,
  staff: StaffMember[],
  options: GenerateOptions = {},
): WeekRoster {
  const patterns = analysePatterns(ARCHIVE);
  const idx = weekIndex(monday);
  const holidays = weekHolidays(monday);
  const week: WeekRoster = {
    monday,
    title: weekTitle(monday),
    notes: "",
    cells: emptyCells(),
    leave: cloneLeave(options.leave ?? {}),
    holidays,
  };

  for (let d = 0; d < 5; d++) {
    if (holidays.includes(d)) continue;

    // Evening templates — highest consistency in the source rosters.
    for (const [stationId, people] of Object.entries(EVENING_TEMPLATE)) {
      const planned = people[d];
      let chosen = pickAvailable(staff, week, d, [planned.id], { allowAssigned: true });
      if (!chosen) {
        const pool =
          stationId === "cobas_n1"
            ? SCIENTISTS
            : stationId === "pvt9"
              ? ["SS", "DM", "SH", "KAH", "SG", "JD"]
              : stationId === "send_eve"
                ? ["KAH", "AD", "AL", "LO", "SS", "JD"]
                : ["RP", "KAH", "JD", "SG", "DM", "LO", "GL"];
        chosen = pickAvailable(staff, week, d, pool, {
          allowAssigned: true,
          requireRole: stationId === "cobas_n1" ? "scientist" : undefined,
        });
      }
      if (chosen) {
        const note =
          chosen.id === planned.id
            ? planned.note ?? noteAffinity(ARCHIVE, stationId, d, chosen.id)
            : noteAffinity(ARCHIVE, stationId, d, chosen.id);
        put(week, stationId, d, { staffId: chosen.id, note });
      }
    }

    // Early start.
    const earlyPref =
      d === 4 ? (idx % 2 === 0 ? ["JD", "AW"] : ["AW", "JD"]) : [EARLY_TEMPLATE[d], "AW", "CS", "WG", "GL", "JD"];
    const early = pickAvailable(staff, week, d, earlyPref, { allowAssigned: true });
    if (early) put(week, "early", d, { staffId: early.id });

    // Immunology scientist — Teresa unless on leave.
    const immuno =
      pickAvailable(staff, week, d, ["TW", "MW", "CS", "AD"], { allowAssigned: true }) ??
      pickAvailable(staff, week, d, SCIENTISTS, { allowAssigned: true });
    if (immuno) {
      put(week, "immuno_sci", d, {
        staffId: immuno.id,
        note: d === 4 && immuno.id === "TW" ? "all day" : undefined,
      });
    }

    // Immuno am — Jacquie / Susie / Alice.
    const immunoAm = pickAvailable(staff, week, d, d === 0 || d === 4 ? ["JD", "SS", "AD"] : ["SS", "JD", "AD"], {
      allowAssigned: true,
    });
    if (immunoAm) put(week, "immuno_am", d, { staffId: immunoAm.id });

    // EPP readers (overlays, not benches).
    const r1 = READERS_1[(idx + d) % READERS_1.length];
    put(week, "epp1", d, { staffId: r1 });
    put(week, "epp2", d, { staffId: READERS_2[d] });
  }

  for (let d = 0; d < 5; d++) {
    if (holidays.includes(d)) continue;

    // PRO 1 rotation among scientists not on leave.
    const start = idx % PRO1_ROTATION.length;
    const rotated = [...PRO1_ROTATION.slice(start), ...PRO1_ROTATION.slice(0, start), "AD"];
    // Prefer someone who is not the evening N1 scientist as sole all-day PRO1? Historical does allow it.
    const pro1 = rankCandidates(staff, week, "pro1", d, patterns, (s) =>
      rotated.indexOf(s.id) === 0 ? 3 : rotated.includes(s.id) ? 1 : 0,
    )[0];
    if (pro1) {
      put(week, "pro1", d, { staffId: pro1.id });
      put(week, "val", d, { staffId: pro1.id });
      // Monday validation often has Greg pm.
      if (d === 0) {
        const greg = pickAvailable(staff, week, d, ["GL"], { allowAssigned: true });
        if (greg && greg.id !== pro1.id) put(week, "val", d, { staffId: greg.id, note: "pm" });
      }
    }

    // PVT-PM error buffers — Tue KAH, Wed JD, Thu GL are very stable.
    const errPref = [PVT_ERR_TEMPLATE[d], "KAH", "JD", "GL", "RP", "AD", "SM", "LO"];
    const err = pickAvailable(staff, week, d, errPref);
    if (err) put(week, "pvt_err", d, { staffId: err.id });

    // EPP bench. Tuesday is Animals.
    const eppStart = (idx + d) % EPP_POOL.length;
    const eppOrder = [...EPP_POOL.slice(eppStart), ...EPP_POOL.slice(0, eppStart)];
    const epp = pickAvailable(staff, week, d, eppOrder);
    if (epp) {
      put(week, "epp", d, { staffId: epp.id, note: d === 1 ? "Animals" : undefined });
    }

    for (const stationId of PRIMARY_FILL_ORDER) {
      if (stationId === "pro1" || stationId === "immuno_sci" || stationId === "immuno_am" || stationId === "epp" || stationId === "pvt_err")
        continue;
      const station = STATIONS.find((s) => s.id === stationId);
      if (!station) continue;
      const have = week.cells[stationId][d].length;
      const need = Math.max(station.min, have);
      const target = station.id === "c513" ? 2 : need;
      while (week.cells[stationId][d].length < target) {
        const ranked = rankCandidates(staff, week, stationId, d, patterns, (s) => {
          if (stationId === "c513" && (s.id === "DM" || s.id === "WG" || s.id === "RP" || s.id === "LO")) return 1.5;
          if (stationId === "alinity" && s.morningsOnly) return 2;
          if (stationId === "pvt_am" && (s.id === "AL" || s.id === "SG" || s.id === "VM" || s.id === "LO")) return 1;
          if (stationId === "send" && (s.id === "LO" || s.id === "RP" || s.id === "DM" || s.id === "KAH")) return 1;
          return 0;
        });
        const next = ranked[0];
        if (!next) break;
        const note = next.morningsOnly ? "am" : noteAffinity(ARCHIVE, stationId, d, next.id);
        put(week, stationId, d, { staffId: next.id, note });
      }
    }

    // Leftover auto-assign people → PVT am, admin (scientists), or PVT pm.
    const leftovers = staff.filter(
      (s) =>
        s.active &&
        s.autoAssign &&
        !s.eveningOnly &&
        s.role !== "pathologist" &&
        s.specialist !== "immunology" &&
        !onLeave(week, s.id, d) &&
        !assignedAnywhere(week, s.id, d),
    );
    for (const s of leftovers) {
      if (s.role === "scientist") {
        put(week, "admin", d, { staffId: s.id });
      } else if (s.morningsOnly) {
        put(week, "pvt_am", d, { staffId: s.id, note: "am" });
      } else if ((week.cells.pvt_pm[d]?.length ?? 0) < 2) {
        put(week, "pvt_pm", d, { staffId: s.id });
      } else {
        put(week, "pvt_am", d, { staffId: s.id });
      }
    }
  }

  return week;
}

export function copyAssignments(from: WeekRoster, monday: string, keepLeave: Record<string, string[]>): WeekRoster {
  const week: WeekRoster = {
    monday,
    title: weekTitle(monday),
    notes: from.notes,
    cells: emptyCells(),
    leave: cloneLeave(keepLeave),
    holidays: weekHolidays(monday),
  };
  for (const station of STATIONS) {
    for (let d = 0; d < 5; d++) {
      if (week.holidays.includes(d)) continue;
      const src = from.cells[station.id]?.[d] ?? [];
      week.cells[station.id][d] = src
        .filter((a) => !onLeave(week, a.staffId, d))
        .map((a) => ({ ...a }));
    }
  }
  return week;
}
