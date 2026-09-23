import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as currentMonthMeta, g as monthStats, h as monthRecords, l as formatPercent, s as formatHours, u as getMonthById, v as selectYear, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, D as CalendarDays, c as Target, h as NotebookPen, o as TrendingUp, p as Plus, w as Clock } from "../_libs/lucide-react.mjs";
import { i as CardContent, n as Button, r as Card, t as AppShell } from "./card-DsUKmRGs.mjs";
import { n as ToneBadge, t as ProgressMeter } from "./progress-meter-DFM4_2Sp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CVA9X9QU.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardView() {
	const yearStart = useAppStore((s) => s.academicYearStart);
	const years = useAppStore((s) => s.years);
	const lastNote = useAppStore((s) => s.lastNote);
	const month = currentMonthMeta();
	const year = selectYear({ years }, yearStart);
	const records = monthRecords(year, yearStart, month.id);
	const stats = monthStats(records);
	const remaining = stats.remaining;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: "Mes actual"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium tracking-tight",
				children: month.name
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Horas acumuladas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-4xl font-medium tabular-nums tracking-tight",
								children: [formatHours(stats.hours), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-base font-sans font-normal text-muted-foreground",
									children: "h"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneBadge, { percent: stats.percent })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressMeter, {
							percent: stats.percent,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Objetivo ",
								50,
								" h"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: remaining > 0 ? `${formatHours(remaining)} h restantes` : "Objetivo cubierto"
							})]
						}),
						stats.percent >= 100 && stats.hours > 50 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high",
							children: [
								"Has superado tu objetivo mensual por",
								" ",
								formatHours(stats.hours - 50),
								" horas."
							]
						}),
						stats.percent >= 100 && stats.hours <= 50 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high",
							children: "Felicitaciones. Objetivo mensual alcanzado."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
						label: "Horas del mes",
						value: `${formatHours(stats.hours)} h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
						label: "Estudios",
						value: String(stats.studies)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }),
						label: "Objetivo",
						value: `50 h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }),
						label: "Avance",
						value: formatPercent(stats.percent)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Última nota"
					}), lastNote?.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-3 text-sm text-muted-foreground",
						children: lastNote.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: getMonthById(lastNote.monthId)?.name
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Todavía no hay notas en este ciclo."
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/mes/$month",
						params: { month: month.slug },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Agregar registro"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/mes/$month",
						params: { month: month.slug },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }),
							"Abrir ",
							month.name
						]
					})
				})]
			})
		]
	}) });
}
function StatCard({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-2 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-medium tabular-nums tracking-tight",
				children: value
			})
		]
	}) });
}
var SplitComponent = DashboardView;
//#endregion
export { SplitComponent as component };
