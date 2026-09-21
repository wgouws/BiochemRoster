import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { holidayName } from "./holidays";

export function mondayOf(d: Date): Date {
  return startOfWeek(d, { weekStartsOn: 1 });
}

export function toISODate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function fromISODate(s: string): Date {
  return parseISO(s);
}

export function weekdayISO(monday: string, day: number): string {
  return toISODate(addDays(parseISO(monday), day));
}

export function weekHolidays(monday: string): number[] {
  const out: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (holidayName(weekdayISO(monday, i))) out.push(i);
  }
  return out;
}

export function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function weekTitle(monday: string): string {
  const start = parseISO(monday);
  const end = addDays(start, 5); // Saturday, matching the source docs
  const sameMonth = start.getMonth() === end.getMonth();
  if (sameMonth) {
    return `Roster ${ordinal(start.getDate())} – ${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
  }
  return `Roster ${ordinal(start.getDate())} ${format(start, "MMMM")} – ${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
}

export function weekRangeLabel(monday: string): string {
  const start = parseISO(monday);
  const end = addDays(start, 4);
  if (start.getMonth() === end.getMonth()) {
    return `${ordinal(start.getDate())}–${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
  }
  return `${ordinal(start.getDate())} ${format(start, "MMM")} – ${ordinal(end.getDate())} ${format(end, "MMM yyyy")}`;
}

export function shiftToMonday(monday: string, deltaWeeks: number): string {
  return toISODate(addDays(parseISO(monday), deltaWeeks * 7));
}
