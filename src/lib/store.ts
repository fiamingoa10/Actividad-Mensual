import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ANNUAL_GOAL,
  MONTHLY_GOAL,
  MONTHS,
  academicYearStart,
  calendarYearForMonth,
  daysInMonth,
  pad2,
  recordBelongsToMonth,
  type MonthId,
} from "@/lib/year";

export type ThemeMode = "light" | "dark" | "system";

export interface ActivityRecord {
  id: string;
  date: string;
  hours: number;
  studies: number;
}

export interface YearData {
  records: ActivityRecord[];
  notes: Partial<Record<MonthId, string>>;
}

export interface LastNote {
  yearStart: number;
  monthId: MonthId;
  text: string;
  at: string;
}

interface AppState {
  theme: ThemeMode;
  academicYearStart: number;
  years: Record<string, YearData>;
  lastNote: LastNote | null;
}

interface AppActions {
  setTheme: (theme: ThemeMode) => void;
  setAcademicYearStart: (year: number) => void;
  addRecord: (yearStart: number, rec: Omit<ActivityRecord, "id">) => void;
  updateRecord: (yearStart: number, rec: ActivityRecord) => void;
  deleteRecord: (yearStart: number, id: string) => void;
  setNotes: (yearStart: number, monthId: MonthId, text: string) => void;
  resetMonth: (yearStart: number, monthId: MonthId) => void;
  resetYear: (yearStart: number) => void;
  loadDemo: (yearStart: number) => void;
  replaceFromBackup: (payload: BackupPayload) => void;
}

export type AppStore = AppState & AppActions;

export interface BackupPayload {
  app: "actividad-mensual";
  version: 1;
  exportedAt: string;
  theme: ThemeMode;
  academicYearStart: number;
  years: Record<string, YearData>;
  lastNote: LastNote | null;
}

function emptyYear(): YearData {
  return { records: [], notes: {} };
}

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function selectYear(
  state: Pick<AppState, "years">,
  yearStart: number,
): YearData {
  return state.years[String(yearStart)] ?? emptyYear();
}

export function monthRecords(
  year: YearData,
  yearStart: number,
  monthId: MonthId,
): ActivityRecord[] {
  return year.records
    .filter((r) => recordBelongsToMonth(r.date, yearStart, monthId))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

export function monthStats(records: ActivityRecord[]) {
  const hours = records.reduce((sum, r) => sum + r.hours, 0);
  const studies = records.reduce((sum, r) => sum + r.studies, 0);
  const percent = (hours / MONTHLY_GOAL) * 100;
  const remaining = Math.max(0, MONTHLY_GOAL - hours);
  return { hours, studies, count: records.length, percent, remaining };
}

export function yearStats(year: YearData, yearStart: number) {
  const rows = MONTHS.map((m) => {
    const recs = monthRecords(year, yearStart, m.id);
    const stats = monthStats(recs);
    return { ...m, ...stats, met: stats.hours >= MONTHLY_GOAL };
  });
  const hours = rows.reduce((sum, r) => sum + r.hours, 0);
  const studies = rows.reduce((sum, r) => sum + r.studies, 0);
  const met = rows.filter((r) => r.met).length;
  return {
    rows,
    hours,
    studies,
    count: year.records.length,
    percent: (hours / ANNUAL_GOAL) * 100,
    remaining: Math.max(0, ANNUAL_GOAL - hours),
    met,
    pending: 12 - met,
    avgHours: hours / 12,
    avgStudies: studies / 12,
  };
}

function patchYear(
  years: Record<string, YearData>,
  yearStart: number,
  updater: (current: YearData) => YearData,
): Record<string, YearData> {
  const key = String(yearStart);
  const next = updater(years[key] ?? emptyYear());
  return { ...years, [key]: next };
}

function demoRecords(yearStart: number): ActivityRecord[] {
  const hourSets = [8, 6.5, 7, 5.5, 9, 4, 6, 7.5, 5, 8.5, 3.5, 4.5];
  const studySets = [2, 1, 3, 1, 2, 0, 2, 1, 2, 3, 1, 0];
  const counts = [6, 8, 5, 9, 4, 7, 8, 5, 7, 3, 6, 4];
  const out: ActivityRecord[] = [];

  MONTHS.forEach((month, index) => {
    const y = calendarYearForMonth(yearStart, month.id);
    const last = daysInMonth(y, month.id);
    const n = counts[index] ?? 4;
    const hoursMonth = hourSets[index] ?? 5;
    const studiesMonth = studySets[index] ?? 1;
    for (let i = 0; i < n; i += 1) {
      const day = Math.min(last, 2 + i * Math.max(1, Math.floor(last / (n + 1))));
      const hours = Math.round((hoursMonth + (i % 3) * 0.5) * 10) / 10;
      const studies = studiesMonth + (i % 2);
      out.push({
        id: `demo-${yearStart}-${month.id}-${i}`,
        date: `${y}-${pad2(month.id)}-${pad2(day)}`,
        hours,
        studies,
      });
    }
  });

  return out;
}

function demoNotes(yearStart: number): Partial<Record<MonthId, string>> {
  return {
    9: `Ciclo ${yearStart}–${yearStart + 1}. Enfoque en constancia: bloques de 90 minutos y lectura diaria.`,
    10: "Buen ritmo. Mantener las sesiones de la mañana y revisar apuntes el domingo.",
    1: "Reinicio de año. Ajustar horarios y recuperar el hábito de estudio.",
  };
}

export function isBackupPayload(value: unknown): value is BackupPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (v.app !== "actividad-mensual") return false;
  if (v.version !== 1) return false;
  if (typeof v.academicYearStart !== "number") return false;
  if (!v.years || typeof v.years !== "object") return false;
  return true;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      academicYearStart: academicYearStart(),
      years: {},
      lastNote: null,

      setTheme: (theme) => set({ theme }),

      setAcademicYearStart: (year) => set({ academicYearStart: year }),

      addRecord: (yearStart, rec) => {
        set({
          years: patchYear(get().years, yearStart, (current) => ({
            ...current,
            records: [{ ...rec, id: newId() }, ...current.records],
          })),
        });
      },

      updateRecord: (yearStart, rec) => {
        set({
          years: patchYear(get().years, yearStart, (current) => ({
            ...current,
            records: current.records.map((item) => (item.id === rec.id ? rec : item)),
          })),
        });
      },

      deleteRecord: (yearStart, id) => {
        set({
          years: patchYear(get().years, yearStart, (current) => ({
            ...current,
            records: current.records.filter((item) => item.id !== id),
          })),
        });
      },

      setNotes: (yearStart, monthId, text) => {
        const trimmed = text;
        const last = get().lastNote;
        const nextLast = trimmed.trim()
          ? {
              yearStart,
              monthId,
              text: trimmed.trim(),
              at: new Date().toISOString(),
            }
          : last?.monthId === monthId && last.yearStart === yearStart
            ? null
            : last;
        set({
          years: patchYear(get().years, yearStart, (current) => ({
            ...current,
            notes: { ...current.notes, [monthId]: trimmed },
          })),
          lastNote: nextLast,
        });
      },

      resetMonth: (yearStart, monthId) => {
        const last = get().lastNote;
        set({
          years: patchYear(get().years, yearStart, (current) => ({
            records: current.records.filter(
              (r) => !recordBelongsToMonth(r.date, yearStart, monthId),
            ),
            notes: { ...current.notes, [monthId]: "" },
          })),
          lastNote:
            last && last.yearStart === yearStart && last.monthId === monthId
              ? null
              : last,
        });
      },

      resetYear: (yearStart) => {
        const key = String(yearStart);
        const years = { ...get().years };
        delete years[key];
        const last = get().lastNote;
        set({
          years,
          lastNote: last && last.yearStart === yearStart ? null : last,
        });
      },

      loadDemo: (yearStart) => {
        set({
          years: {
            ...get().years,
            [String(yearStart)]: {
              records: demoRecords(yearStart),
              notes: demoNotes(yearStart),
            },
          },
          lastNote: {
            yearStart,
            monthId: 9,
            text: demoNotes(yearStart)[9] ?? "",
            at: new Date().toISOString(),
          },
        });
      },

      replaceFromBackup: (payload) => {
        set({
          theme: payload.theme ?? get().theme,
          academicYearStart: payload.academicYearStart,
          years: payload.years ?? {},
          lastNote: payload.lastNote ?? null,
        });
      },
    }),
    {
      name: "actividad-mensual-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        theme: state.theme,
        academicYearStart: state.academicYearStart,
        years: state.years,
        lastNote: state.lastNote,
      }),
    },
  ),
);

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", dark);
}
