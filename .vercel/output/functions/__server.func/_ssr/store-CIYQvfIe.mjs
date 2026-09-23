import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CIYQvfIe.js
var MONTHS = [
	{
		id: 9,
		slug: "septiembre",
		name: "Septiembre",
		short: "Sep"
	},
	{
		id: 10,
		slug: "octubre",
		name: "Octubre",
		short: "Oct"
	},
	{
		id: 11,
		slug: "noviembre",
		name: "Noviembre",
		short: "Nov"
	},
	{
		id: 12,
		slug: "diciembre",
		name: "Diciembre",
		short: "Dic"
	},
	{
		id: 1,
		slug: "enero",
		name: "Enero",
		short: "Ene"
	},
	{
		id: 2,
		slug: "febrero",
		name: "Febrero",
		short: "Feb"
	},
	{
		id: 3,
		slug: "marzo",
		name: "Marzo",
		short: "Mar"
	},
	{
		id: 4,
		slug: "abril",
		name: "Abril",
		short: "Abr"
	},
	{
		id: 5,
		slug: "mayo",
		name: "Mayo",
		short: "May"
	},
	{
		id: 6,
		slug: "junio",
		name: "Junio",
		short: "Jun"
	},
	{
		id: 7,
		slug: "julio",
		name: "Julio",
		short: "Jul"
	},
	{
		id: 8,
		slug: "agosto",
		name: "Agosto",
		short: "Ago"
	}
];
function pad2(n) {
	return String(n).padStart(2, "0");
}
function academicYearStart(date = /* @__PURE__ */ new Date()) {
	return date.getMonth() + 1 >= 9 ? date.getFullYear() : date.getFullYear() - 1;
}
function calendarYearForMonth(yearStart, monthId) {
	return monthId >= 9 ? yearStart : yearStart + 1;
}
function academicYearLabel(yearStart) {
	return `${yearStart}–${yearStart + 1}`;
}
function isoToday() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function daysInMonth(year, monthId) {
	return new Date(year, monthId, 0).getDate();
}
function monthRange(yearStart, monthId) {
	const y = calendarYearForMonth(yearStart, monthId);
	const last = daysInMonth(y, monthId);
	return {
		min: `${y}-${pad2(monthId)}-01`,
		max: `${y}-${pad2(monthId)}-${pad2(last)}`
	};
}
function defaultDateForMonth(yearStart, monthId) {
	const today = isoToday();
	const { min, max } = monthRange(yearStart, monthId);
	if (today >= min && today <= max) return today;
	return min;
}
function getMonthBySlug(slug) {
	return MONTHS.find((m) => m.slug === slug);
}
function getMonthById(id) {
	return MONTHS.find((m) => m.id === id);
}
function currentMonthMeta(date = /* @__PURE__ */ new Date()) {
	return getMonthById(date.getMonth() + 1) ?? MONTHS[0];
}
function progressTone(percent) {
	if (percent >= 100) return "high";
	if (percent >= 50) return "mid";
	return "low";
}
function formatHours(n) {
	return (Math.round(n * 10) / 10).toLocaleString("es-ES", { maximumFractionDigits: 1 });
}
function formatPercent(n) {
	return `${Math.round(n)} %`;
}
function formatLongDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
}
function recordBelongsToMonth(date, yearStart, monthId) {
	const prefix = `${calendarYearForMonth(yearStart, monthId)}-${pad2(monthId)}-`;
	return date.startsWith(prefix);
}
function emptyYear() {
	return {
		records: [],
		notes: {}
	};
}
function newId() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function selectYear(state, yearStart) {
	return state.years[String(yearStart)] ?? emptyYear();
}
function monthRecords(year, yearStart, monthId) {
	return year.records.filter((r) => recordBelongsToMonth(r.date, yearStart, monthId)).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}
function monthStats(records) {
	const hours = records.reduce((sum, r) => sum + r.hours, 0);
	const studies = records.reduce((sum, r) => sum + r.studies, 0);
	const percent = hours / 50 * 100;
	const remaining = Math.max(0, 50 - hours);
	return {
		hours,
		studies,
		count: records.length,
		percent,
		remaining
	};
}
function yearStats(year, yearStart) {
	const rows = MONTHS.map((m) => {
		const stats = monthStats(monthRecords(year, yearStart, m.id));
		return {
			...m,
			...stats,
			met: stats.hours >= 50
		};
	});
	const hours = rows.reduce((sum, r) => sum + r.hours, 0);
	const studies = rows.reduce((sum, r) => sum + r.studies, 0);
	const met = rows.filter((r) => r.met).length;
	return {
		rows,
		hours,
		studies,
		count: year.records.length,
		percent: hours / 600 * 100,
		remaining: Math.max(0, 600 - hours),
		met,
		pending: 12 - met,
		avgHours: hours / 12,
		avgStudies: studies / 12
	};
}
function patchYear(years, yearStart, updater) {
	const key = String(yearStart);
	const next = updater(years[key] ?? emptyYear());
	return {
		...years,
		[key]: next
	};
}
function demoRecords(yearStart) {
	const hourSets = [
		8,
		6.5,
		7,
		5.5,
		9,
		4,
		6,
		7.5,
		5,
		8.5,
		3.5,
		4.5
	];
	const studySets = [
		2,
		1,
		3,
		1,
		2,
		0,
		2,
		1,
		2,
		3,
		1,
		0
	];
	const counts = [
		6,
		8,
		5,
		9,
		4,
		7,
		8,
		5,
		7,
		3,
		6,
		4
	];
	const out = [];
	MONTHS.forEach((month, index) => {
		const y = calendarYearForMonth(yearStart, month.id);
		const last = daysInMonth(y, month.id);
		const n = counts[index] ?? 4;
		const hoursMonth = hourSets[index] ?? 5;
		const studiesMonth = studySets[index] ?? 1;
		for (let i = 0; i < n; i += 1) {
			const day = Math.min(last, 2 + i * Math.max(1, Math.floor(last / (n + 1))));
			const hours = Math.round((hoursMonth + i % 3 * .5) * 10) / 10;
			const studies = studiesMonth + i % 2;
			out.push({
				id: `demo-${yearStart}-${month.id}-${i}`,
				date: `${y}-${pad2(month.id)}-${pad2(day)}`,
				hours,
				studies
			});
		}
	});
	return out;
}
function demoNotes(yearStart) {
	return {
		9: `Ciclo ${yearStart}–${yearStart + 1}. Enfoque en constancia: bloques de 90 minutos y lectura diaria.`,
		10: "Buen ritmo. Mantener las sesiones de la mañana y revisar apuntes el domingo.",
		1: "Reinicio de año. Ajustar horarios y recuperar el hábito de estudio."
	};
}
function isBackupPayload(value) {
	if (!value || typeof value !== "object") return false;
	const v = value;
	if (v.app !== "actividad-mensual") return false;
	if (v.version !== 1) return false;
	if (typeof v.academicYearStart !== "number") return false;
	if (!v.years || typeof v.years !== "object") return false;
	return true;
}
var useAppStore = create()(persist((set, get) => ({
	theme: "system",
	academicYearStart: academicYearStart(),
	years: {},
	lastNote: null,
	setTheme: (theme) => set({ theme }),
	setAcademicYearStart: (year) => set({ academicYearStart: year }),
	addRecord: (yearStart, rec) => {
		set({ years: patchYear(get().years, yearStart, (current) => ({
			...current,
			records: [{
				...rec,
				id: newId()
			}, ...current.records]
		})) });
	},
	updateRecord: (yearStart, rec) => {
		set({ years: patchYear(get().years, yearStart, (current) => ({
			...current,
			records: current.records.map((item) => item.id === rec.id ? rec : item)
		})) });
	},
	deleteRecord: (yearStart, id) => {
		set({ years: patchYear(get().years, yearStart, (current) => ({
			...current,
			records: current.records.filter((item) => item.id !== id)
		})) });
	},
	setNotes: (yearStart, monthId, text) => {
		const trimmed = text;
		const last = get().lastNote;
		const nextLast = trimmed.trim() ? {
			yearStart,
			monthId,
			text: trimmed.trim(),
			at: (/* @__PURE__ */ new Date()).toISOString()
		} : last?.monthId === monthId && last.yearStart === yearStart ? null : last;
		set({
			years: patchYear(get().years, yearStart, (current) => ({
				...current,
				notes: {
					...current.notes,
					[monthId]: trimmed
				}
			})),
			lastNote: nextLast
		});
	},
	resetMonth: (yearStart, monthId) => {
		const last = get().lastNote;
		set({
			years: patchYear(get().years, yearStart, (current) => ({
				records: current.records.filter((r) => !recordBelongsToMonth(r.date, yearStart, monthId)),
				notes: {
					...current.notes,
					[monthId]: ""
				}
			})),
			lastNote: last && last.yearStart === yearStart && last.monthId === monthId ? null : last
		});
	},
	resetYear: (yearStart) => {
		const key = String(yearStart);
		const years = { ...get().years };
		delete years[key];
		const last = get().lastNote;
		set({
			years,
			lastNote: last && last.yearStart === yearStart ? null : last
		});
	},
	loadDemo: (yearStart) => {
		set({
			years: {
				...get().years,
				[String(yearStart)]: {
					records: demoRecords(yearStart),
					notes: demoNotes(yearStart)
				}
			},
			lastNote: {
				yearStart,
				monthId: 9,
				text: demoNotes(yearStart)[9] ?? "",
				at: (/* @__PURE__ */ new Date()).toISOString()
			}
		});
	},
	replaceFromBackup: (payload) => {
		set({
			theme: payload.theme ?? get().theme,
			academicYearStart: payload.academicYearStart,
			years: payload.years ?? {},
			lastNote: payload.lastNote ?? null
		});
	}
}), {
	name: "actividad-mensual-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		theme: state.theme,
		academicYearStart: state.academicYearStart,
		years: state.years,
		lastNote: state.lastNote
	})
}));
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const dark = theme === "dark" || theme === "system" && prefersDark;
	root.classList.toggle("dark", dark);
}
//#endregion
export { progressTone as _, currentMonthMeta as a, yearStats as b, formatLongDate as c, getMonthBySlug as d, isBackupPayload as f, monthStats as g, monthRecords as h, applyTheme as i, formatPercent as l, monthRange as m, academicYearLabel as n, defaultDateForMonth as o, isoToday as p, academicYearStart as r, formatHours as s, MONTHS as t, getMonthById as u, selectYear as v, useAppStore as y };
