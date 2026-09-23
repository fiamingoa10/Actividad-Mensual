import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as yearStats, l as formatPercent, n as academicYearLabel, s as formatHours, v as selectYear, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, O as CalendarClock, c as Target, k as CalendarCheck, o as TrendingUp, w as Clock } from "../_libs/lucide-react.mjs";
import { a as CardHeader, c as cn, i as CardContent, o as CardTitle, r as Card, t as AppShell } from "./card-DsUKmRGs.mjs";
import { n as ToneBadge, t as ProgressMeter } from "./progress-meter-DFM4_2Sp.mjs";
import { a as XAxis, c as ReferenceLine, d as Cell, f as ResponsiveContainer, i as YAxis, l as Bar, n as BarChart, o as Line, p as Tooltip, r as LineChart, s as CartesianGrid, t as PieChart, u as Pie } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resumen-DahALuw4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useMounted() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return mounted;
}
function ChartFrame({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
		className: "text-base",
		children: title
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full",
			children
		})
	})] });
}
function ChartTip({ active, payload, label, suffix }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "tabular-nums text-muted-foreground",
			children: [
				formatHours(Number(payload[0]?.value ?? 0)),
				" ",
				suffix
			]
		})]
	});
}
function YearCharts({ stats }) {
	const mounted = useMounted();
	const barData = stats.rows.map((r) => ({
		short: r.short,
		name: r.name,
		hours: Math.round(r.hours * 10) / 10,
		studies: r.studies
	}));
	let running = 0;
	const progressData = stats.rows.map((r) => {
		running += r.hours;
		return {
			short: r.short,
			name: r.name,
			acumulado: Math.round(running * 10) / 10
		};
	});
	const pieData = [{
		name: "Cumplidos",
		value: stats.met
	}, {
		name: "Pendientes",
		value: stats.pending
	}];
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-2xl bg-muted" })]
	});
	const tick = {
		fill: "var(--color-muted-foreground)",
		fontSize: 11
	};
	const grid = "var(--color-border)";
	const primary = "var(--color-primary)";
	const ink = "var(--color-foreground)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				title: "Horas por mes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: barData,
						margin: {
							top: 8,
							right: 4,
							left: -18,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: grid,
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "short",
								tick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-secondary)" },
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, { suffix: "h" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: 50,
								stroke: ink,
								strokeDasharray: "4 4",
								strokeOpacity: .35
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "hours",
								fill: primary,
								radius: [
									6,
									6,
									0,
									0
								],
								maxBarSize: 22
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				title: "Estudios por mes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: barData,
						margin: {
							top: 8,
							right: 4,
							left: -18,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: grid,
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "short",
								tick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick,
								axisLine: false,
								tickLine: false,
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-secondary)" },
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, { suffix: "estudios" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "studies",
								fill: ink,
								radius: [
									6,
									6,
									0,
									0
								],
								maxBarSize: 22
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				title: "Progreso anual acumulado",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: progressData,
						margin: {
							top: 8,
							right: 8,
							left: -18,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: grid,
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "short",
								tick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, { suffix: "h acumuladas" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: 600,
								stroke: "var(--color-progress-high)",
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "acumulado",
								stroke: primary,
								strokeWidth: 2.4,
								dot: {
									r: 3,
									fill: primary
								},
								activeDot: { r: 5 }
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartFrame, {
				title: "Meses con objetivo alcanzado",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pie, {
						data: pieData,
						dataKey: "value",
						nameKey: "name",
						innerRadius: 52,
						outerRadius: 78,
						paddingAngle: 2,
						stroke: "none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "var(--color-progress-high)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "var(--color-secondary)" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
						if (!active || !payload?.length) return null;
						const item = payload[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-card",
							children: [
								item.name,
								": ",
								item.value
							]
						});
					} })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-center gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-progress-high" }),
							"Cumplidos (",
							stats.met,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-secondary" }),
							"Pendientes (",
							stats.pending,
							")"
						]
					})]
				})]
			})
		]
	});
}
function AnnualView() {
	const yearStart = useAppStore((s) => s.academicYearStart);
	const years = useAppStore((s) => s.years);
	const year = selectYear({ years }, yearStart);
	const stats = yearStats(year, yearStart);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Resumen anual",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: "Resumen anual"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Ciclo ",
						academicYearLabel(yearStart),
						" · objetivo ",
						600,
						" h"
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Total de horas"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: stats.remaining > 0 ? `${formatHours(stats.remaining)} h para las 600` : "Objetivo anual cubierto"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: Clock,
							label: "Horas",
							value: `${formatHours(stats.hours)} h`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: BookOpen,
							label: "Estudios",
							value: String(stats.studies)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: Target,
							label: "Objetivo",
							value: `600 h`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: TrendingUp,
							label: "Progreso",
							value: formatPercent(stats.percent)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: CalendarCheck,
							label: "Meses cumplidos",
							value: String(stats.met)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							icon: CalendarClock,
							label: "Meses pendientes",
							value: String(stats.pending)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						icon: Clock,
						label: "Promedio horas",
						value: `${formatHours(stats.avgHours)} h`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						icon: BookOpen,
						label: "Promedio estudios",
						value: formatHours(stats.avgStudies)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Tabla del ciclo"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "overflow-x-auto p-0 pb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[18rem] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "Mes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-medium tabular-nums",
									children: "Horas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-medium tabular-nums",
									children: "Estudios"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 font-medium",
									children: "%"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [stats.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/mes/$month",
										params: { month: row.slug },
										className: "font-medium text-primary",
										children: row.name
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2.5 tabular-nums",
									children: formatHours(row.hours)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2.5 tabular-nums",
									children: row.studies
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("tabular-nums", row.met ? "text-progress-high" : "text-muted-foreground"),
										children: formatPercent(row.percent)
									})
								})
							]
						}, row.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border bg-secondary/60 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5",
									children: "Total general"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2.5 tabular-nums",
									children: formatHours(stats.hours)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2.5 tabular-nums",
									children: stats.studies
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2.5 tabular-nums",
									children: formatPercent(stats.percent)
								})
							]
						})] })]
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCharts, { stats })
			]
		})
	});
}
function Mini({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-1.5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" }),
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
var SplitComponent = AnnualView;
//#endregion
export { SplitComponent as component };
