export const MONTHLY_GOAL = 50;
export const ANNUAL_GOAL = 600;

export const MONTHS = [
  { id: 9 as const, slug: "septiembre", name: "Septiembre", short: "Sep" },
  { id: 10 as const, slug: "octubre", name: "Octubre", short: "Oct" },
  { id: 11 as const, slug: "noviembre", name: "Noviembre", short: "Nov" },
  { id: 12 as const, slug: "diciembre", name: "Diciembre", short: "Dic" },
  { id: 1 as const, slug: "enero", name: "Enero", short: "Ene" },
  { id: 2 as const, slug: "febrero", name: "Febrero", short: "Feb" },
  { id: 3 as const, slug: "marzo", name: "Marzo", short: "Mar" },
  { id: 4 as const, slug: "abril", name: "Abril", short: "Abr" },
  { id: 5 as const, slug: "mayo", name: "Mayo", short: "May" },
  { id: 6 as const, slug: "junio", name: "Junio", short: "Jun" },
  { id: 7 as const, slug: "julio", name: "Julio", short: "Jul" },
  { id: 8 as const, slug: "agosto", name: "Agosto", short: "Ago" },
] as const;

export type MonthId = (typeof MONTHS)[number]["id"];
export type MonthSlug = (typeof MONTHS)[number]["slug"];
export type MonthMeta = (typeof MONTHS)[number];

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function academicYearStart(date: Date = new Date()): number {
  return date.getMonth() + 1 >= 9 ? date.getFullYear() : date.getFullYear() - 1;
}

export function calendarYearForMonth(yearStart: number, monthId: number): number {
  return monthId >= 9 ? yearStart : yearStart + 1;
}

export function academicYearLabel(yearStart: number): string {
  return `${yearStart}–${yearStart + 1}`;
}

export function isoToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function daysInMonth(year: number, monthId: number): number {
  return new Date(year, monthId, 0).getDate();
}

export function monthRange(yearStart: number, monthId: number): { min: string; max: string } {
  const y = calendarYearForMonth(yearStart, monthId);
  const last = daysInMonth(y, monthId);
  return {
    min: `${y}-${pad2(monthId)}-01`,
    max: `${y}-${pad2(monthId)}-${pad2(last)}`,
  };
}

export function defaultDateForMonth(yearStart: number, monthId: number): string {
  const today = isoToday();
  const { min, max } = monthRange(yearStart, monthId);
  if (today >= min && today <= max) return today;
  return min;
}

export function getMonthBySlug(slug: string): MonthMeta | undefined {
  return MONTHS.find((m) => m.slug === slug);
}

export function getMonthById(id: number): MonthMeta | undefined {
  return MONTHS.find((m) => m.id === id);
}

export function currentMonthMeta(date = new Date()): MonthMeta {
  const id = (date.getMonth() + 1) as MonthId;
  return getMonthById(id) ?? MONTHS[0];
}

export function progressTone(percent: number): "low" | "mid" | "high" {
  if (percent >= 100) return "high";
  if (percent >= 50) return "mid";
  return "low";
}

export function formatHours(n: number): string {
  const rounded = Math.round(n * 10) / 10;
  return rounded.toLocaleString("es-ES", { maximumFractionDigits: 1 });
}

export function formatPercent(n: number): string {
  return `${Math.round(n)} %`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatFullDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function recordBelongsToMonth(
  date: string,
  yearStart: number,
  monthId: MonthId,
): boolean {
  const prefix = `${calendarYearForMonth(yearStart, monthId)}-${pad2(monthId)}-`;
  return date.startsWith(prefix);
}
