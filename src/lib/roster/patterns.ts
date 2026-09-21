import { ARCHIVE } from "./archive";
import { STAFF } from "./staff";
import { STATIONS } from "./stations";
import type { PatternStat, WeekRoster } from "./types";

export interface SlotPattern {
  stationId: string;
  day: number;
  total: number;
  counts: { staffId: string; count: number; pct: number }[];
  locked?: { staffId: string; note?: string; pct: number };
}

const LOCK_PCT = 0.7;

export function analysePatterns(weeks: WeekRoster[] = ARCHIVE): SlotPattern[] {
  const map = new Map<string, Map<string, number>>();
  const totals = new Map<string, number>();

  for (const week of weeks) {
    for (const station of STATIONS) {
      const row = week.cells[station.id];
      if (!row) continue;
      for (let d = 0; d < 5; d++) {
        if (week.holidays.includes(d)) continue;
        const cell = row[d] ?? [];
        if (!cell.length) continue;
        const key = `${station.id}:${d}`;
        totals.set(key, (totals.get(key) ?? 0) + 1);
        let dayMap = map.get(key);
        if (!dayMap) {
          dayMap = new Map();
          map.set(key, dayMap);
        }
        for (const a of cell) {
          dayMap.set(a.staffId, (dayMap.get(a.staffId) ?? 0) + 1);
        }
      }
    }
  }

  const patterns: SlotPattern[] = [];
  for (const station of STATIONS) {
    for (let d = 0; d < 5; d++) {
      const key = `${station.id}:${d}`;
      const total = totals.get(key) ?? 0;
      if (!total) continue;
      const counts = [...(map.get(key)?.entries() ?? [])]
        .map(([staffId, count]) => ({
          staffId,
          count,
          pct: count / total,
        }))
        .sort((a, b) => b.count - a.count);
      const top = counts[0];
      patterns.push({
        stationId: station.id,
        day: d,
        total,
        counts,
        locked:
          top && top.pct >= LOCK_PCT
            ? { staffId: top.staffId, pct: top.pct }
            : undefined,
      });
    }
  }
  return patterns;
}

export function topPatterns(limit = 24): PatternStat[] {
  const patterns = analysePatterns();
  const out: PatternStat[] = [];
  for (const p of patterns) {
    const top = p.counts[0];
    if (!top) continue;
    out.push({
      stationId: p.stationId,
      day: p.day,
      staffId: top.staffId,
      count: top.count,
      total: p.total,
      pct: top.pct,
    });
  }
  return out.sort((a, b) => b.pct - a.pct || b.count - a.count).slice(0, limit);
}

export function affinityScore(
  patterns: SlotPattern[],
  stationId: string,
  day: number,
  staffId: string,
): number {
  const p = patterns.find((x) => x.stationId === stationId && x.day === day);
  const hit = p?.counts.find((c) => c.staffId === staffId);
  return hit ? hit.pct : 0;
}

export function noteAffinity(
  weeks: WeekRoster[] = ARCHIVE,
  stationId: string,
  day: number,
  staffId: string,
): string | undefined {
  const notes = new Map<string, number>();
  for (const week of weeks) {
    const cell = week.cells[stationId]?.[day] ?? [];
    for (const a of cell) {
      if (a.staffId === staffId && a.note) {
        notes.set(a.note, (notes.get(a.note) ?? 0) + 1);
      }
    }
  }
  let best: string | undefined;
  let n = 0;
  for (const [note, count] of notes) {
    if (count > n) {
      n = count;
      best = note;
    }
  }
  return best;
}

export function staffName(id: string): string {
  return STAFF.find((s) => s.id === id)?.rosterName ?? id;
}
