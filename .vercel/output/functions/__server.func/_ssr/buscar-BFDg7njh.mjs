import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as formatLongDate, p as isoToday, s as formatHours, u as getMonthById, v as selectYear, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Search } from "../_libs/lucide-react.mjs";
import { i as CardContent, r as Card, t as AppShell } from "./card-DsUKmRGs.mjs";
import { n as Label, t as Input } from "./label-CJTkKaOP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-BFDg7njh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchView() {
	const yearStart = useAppStore((s) => s.academicYearStart);
	const years = useAppStore((s) => s.years);
	const year = selectYear({ years }, yearStart);
	const [date, setDate] = (0, import_react.useState)(isoToday());
	const matches = (0, import_react.useMemo)(() => year.records.filter((r) => r.date === date).sort((a, b) => b.id.localeCompare(a.id)), [year.records, date]);
	const month = date ? getMonthById(Number(date.slice(5, 7))) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Buscar",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: "Buscar por fecha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Encuentra registros exactos del ciclo actual."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "search-date",
						children: "Fecha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "search-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})]
				}) }),
				matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col items-center gap-2 px-5 py-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"No hay registros el ",
							date ? formatLongDate(date) : "día elegido",
							"."
						]
					})]
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: matches.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center justify-between gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium capitalize",
							children: formatLongDate(rec.date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground tabular-nums",
							children: [
								formatHours(rec.hours),
								" h · ",
								rec.studies,
								" estudios"
							]
						})] }), month && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/mes/$month",
							params: { month: month.slug },
							className: "text-sm font-medium text-primary",
							children: month.name
						})]
					}) }) }, rec.id))
				})
			]
		})
	});
}
var SplitComponent = SearchView;
//#endregion
export { SplitComponent as component };
