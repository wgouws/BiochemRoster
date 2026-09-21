import type { Assignment } from "./types";

/** Compact cell language: "CS:am+GL:pm", "WG+MW", "TW:all day", "" or "-". */
export function parseCell(spec: string | undefined | null): Assignment[] {
  if (!spec) return [];
  const trimmed = spec.trim();
  if (!trimmed || trimmed === "-" || trimmed === "–") return [];
  return trimmed.split("+").flatMap((part) => {
    const token = part.trim();
    if (!token) return [];
    const colon = token.indexOf(":");
    if (colon === -1) return [{ staffId: token }];
    const staffId = token.slice(0, colon).trim();
    const note = token.slice(colon + 1).trim();
    if (!staffId) return [];
    return [{ staffId, note: note || undefined }];
  });
}

export function days(
  mon: string,
  tue: string,
  wed: string,
  thu: string,
  fri: string,
): Assignment[][] {
  return [parseCell(mon), parseCell(tue), parseCell(wed), parseCell(thu), parseCell(fri)];
}

export function formatCell(as: Assignment[], nameOf: (id: string) => string): string {
  if (!as.length) return "";
  return as
    .map((a) => {
      const n = nameOf(a.staffId);
      return a.note ? `${n} – ${a.note}` : n;
    })
    .join("\n");
}

export function emptyLeave(): Record<string, string[]> {
  return {};
}

export function leaveSlot(leave: Record<string, string[]>, staffId: string, day: number): string {
  return leave[staffId]?.[day] ?? "";
}

export function isOnLeave(leave: Record<string, string[]>, staffId: string, day: number): boolean {
  return Boolean(leave[staffId]?.[day]);
}

export function setLeave(
  leave: Record<string, string[]>,
  staffId: string,
  day: number,
  note: string | null,
): Record<string, string[]> {
  const next = { ...leave };
  const row = [...(next[staffId] ?? ["", "", "", "", ""])];
  row[day] = note ?? "";
  if (row.every((x) => !x)) {
    delete next[staffId];
  } else {
    next[staffId] = row;
  }
  return next;
}
