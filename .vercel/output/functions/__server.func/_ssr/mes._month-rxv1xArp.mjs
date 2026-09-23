import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as formatLongDate, d as getMonthBySlug, g as monthStats, h as monthRecords, l as formatPercent, m as monthRange, o as defaultDateForMonth, s as formatHours, t as MONTHS, v as selectYear, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, S as Eraser, T as CircleCheck, c as Target, i as Trophy, m as Pencil, p as Plus, s as Trash2, t as X, v as ListOrdered, w as Clock } from "../_libs/lucide-react.mjs";
import { a as CardHeader, c as cn, i as CardContent, n as Button, o as CardTitle, r as Card, t as AppShell } from "./card-DsUKmRGs.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CsZS0xWP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-CJTkKaOP.mjs";
import { n as Route } from "./router-jiPjMmRJ.mjs";
import { n as ToneBadge, t as ProgressMeter } from "./progress-meter-DFM4_2Sp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mes._month-rxv1xArp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-xl border border-input bg-card px-3.5 py-3 text-base text-foreground transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl bg-card p-5 text-card-foreground shadow-card duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Cerrar"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8 text-left", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-lg font-medium tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function MonthView({ month }) {
	const yearStart = useAppStore((s) => s.academicYearStart);
	const years = useAppStore((s) => s.years);
	const resetMonth = useAppStore((s) => s.resetMonth);
	const year = selectYear({ years }, yearStart);
	const records = monthRecords(year, yearStart, month.id);
	const stats = monthStats(records);
	const notes = year.notes[month.id] ?? "";
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: month.name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthStrip, { current: month.slug }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: month.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Registro, objetivo y notas del mes"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalCard, { stats }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryGrid, { stats }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordForm, {
					yearStart,
					month
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordList, {
					yearStart,
					month,
					records
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesBlock, {
					yearStart,
					month,
					value: notes
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "w-full text-destructive hover:text-destructive",
					onClick: () => setResetOpen(true),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" }),
						"Reiniciar ",
						month.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
					open: resetOpen,
					onOpenChange: setResetOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: ["Reiniciar ", month.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Se borrarán los registros y las notas de este mes. El resto del ciclo se mantiene." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						className: "bg-destructive text-destructive-foreground hover:opacity-90",
						onClick: () => {
							resetMonth(yearStart, month.id);
							toast.success(`${month.name} se reinició.`);
						},
						children: "Reiniciar mes"
					})] })] })
				})
			]
		})
	});
}
function MonthStrip({ current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 overflow-x-auto px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1.5 pb-1",
			children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/mes/$month",
				params: { month: m.slug },
				className: cn("inline-flex h-9 shrink-0 items-center rounded-full px-3 text-xs font-medium transition-colors", m.slug === current ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
				children: m.short
			}, m.slug))
		})
	});
}
function GoalCard({ stats }) {
	const over = stats.hours - 50;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Objetivo mensual"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneBadge, { percent: stats.percent })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressMeter, {
				percent: stats.percent,
				size: "lg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Acumuladas",
						value: `${formatHours(stats.hours)} h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Restantes",
						value: `${formatHours(stats.remaining)} h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Meta",
						value: `50 h`
					})
				]
			}),
			stats.percent >= 100 && over > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mt-0.5 size-4 shrink-0" }),
					"Has superado tu objetivo mensual por ",
					formatHours(over),
					" horas."
				]
			}),
			stats.percent >= 100 && over <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0" }), "Felicitaciones. Objetivo mensual alcanzado."]
			})
		]
	}) });
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium tabular-nums",
			children: value
		})]
	});
}
function SummaryGrid({ stats }) {
	const items = [
		{
			icon: Clock,
			label: "Total de horas",
			value: `${formatHours(stats.hours)} h`
		},
		{
			icon: BookOpen,
			label: "Total de estudios",
			value: String(stats.studies)
		},
		{
			icon: ListOrdered,
			label: "Registros",
			value: String(stats.count)
		},
		{
			icon: Target,
			label: "Porcentaje",
			value: formatPercent(stats.percent)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-1.5 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium tabular-nums tracking-tight",
					children: item.value
				})
			]
		}) }, item.label))
	});
}
function parseHours(raw) {
	const normalized = raw.trim().replace(",", ".");
	if (!normalized) return null;
	const n = Number(normalized);
	if (!Number.isFinite(n)) return null;
	return Math.round(n * 10) / 10;
}
function parseStudies(raw) {
	const normalized = raw.trim();
	if (!normalized) return null;
	if (!/^\d+$/.test(normalized)) return null;
	return Number(normalized);
}
function validateRecord(date, hoursRaw, studiesRaw, min, max) {
	if (!date) return "Elige una fecha.";
	if (date < min || date > max) return "La fecha debe pertenecer a este mes.";
	const hours = parseHours(hoursRaw);
	const studies = parseStudies(studiesRaw);
	if (hours === null) return "Indica las horas.";
	if (hours < 0) return "No se permiten números negativos.";
	if (hours > 24) return "Las horas de un registro no pueden superar 24.";
	if (studies === null) return "Indica los estudios (número entero).";
	if (studies < 0) return "No se permiten números negativos.";
	if (hours === 0 && studies === 0) return "El registro no puede quedar vacío.";
	return null;
}
function RecordForm({ yearStart, month }) {
	const addRecord = useAppStore((s) => s.addRecord);
	const range = (0, import_react.useMemo)(() => monthRange(yearStart, month.id), [yearStart, month.id]);
	const [date, setDate] = (0, import_react.useState)(defaultDateForMonth(yearStart, month.id));
	const [hours, setHours] = (0, import_react.useState)("");
	const [studies, setStudies] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setDate(defaultDateForMonth(yearStart, month.id));
		setHours("");
		setStudies("");
	}, [yearStart, month.id]);
	function onSubmit(e) {
		e.preventDefault();
		const error = validateRecord(date, hours, studies, range.min, range.max);
		if (error) {
			toast.error(error);
			return;
		}
		addRecord(yearStart, {
			date,
			hours: parseHours(hours) ?? 0,
			studies: parseStudies(studies) ?? 0
		});
		toast.success("Registro agregado.");
		setHours("");
		setStudies("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
		className: "text-base",
		children: "Nuevo registro"
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Fecha",
				htmlFor: "rec-date",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "rec-date",
					type: "date",
					value: date,
					min: range.min,
					max: range.max,
					onChange: (e) => setDate(e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Horas",
					htmlFor: "rec-hours",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rec-hours",
						inputMode: "decimal",
						placeholder: "0,0",
						value: hours,
						onChange: (e) => setHours(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Estudios",
					htmlFor: "rec-studies",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rec-studies",
						inputMode: "numeric",
						placeholder: "0",
						value: studies,
						onChange: (e) => setStudies(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Agregar registro"]
			})
		]
	}) })] });
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
function RecordList({ yearStart, month, records }) {
	const updateRecord = useAppStore((s) => s.updateRecord);
	const deleteRecord = useAppStore((s) => s.deleteRecord);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const range = monthRange(yearStart, month.id);
	const [date, setDate] = (0, import_react.useState)("");
	const [hours, setHours] = (0, import_react.useState)("");
	const [studies, setStudies] = (0, import_react.useState)("");
	function openEdit(rec) {
		setEditing(rec);
		setDate(rec.date);
		setHours(String(rec.hours).replace(".", ","));
		setStudies(String(rec.studies));
	}
	function saveEdit() {
		if (!editing) return;
		const error = validateRecord(date, hours, studies, range.min, range.max);
		if (error) {
			toast.error(error);
			return;
		}
		updateRecord(yearStart, {
			id: editing.id,
			date,
			hours: parseHours(hours) ?? 0,
			studies: parseStudies(studies) ?? 0
		});
		toast.success("Registro actualizado.");
		setEditing(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Registros"
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0 pb-2",
			children: records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-5 pb-5 text-sm text-muted-foreground",
				children: [
					"No hay registros en ",
					month.name,
					". Agrega el primero con el formulario."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: records.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
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
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Editar registro",
							onClick: () => openEdit(rec),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Eliminar registro",
							onClick: () => setPendingDelete(rec),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})
					]
				}, rec.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Editar registro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Los cambios se guardan en este dispositivo." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fecha",
						htmlFor: "edit-date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "edit-date",
							type: "date",
							value: date,
							min: range.min,
							max: range.max,
							onChange: (e) => setDate(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Horas",
							htmlFor: "edit-hours",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-hours",
								inputMode: "decimal",
								value: hours,
								onChange: (e) => setHours(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estudios",
							htmlFor: "edit-studies",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "edit-studies",
								inputMode: "numeric",
								value: studies,
								onChange: (e) => setStudies(e.target.value)
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setEditing(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: saveEdit,
					children: "Guardar"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!pendingDelete,
			onOpenChange: (o) => !o && setPendingDelete(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Eliminar registro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
				"Esta acción no se puede deshacer. Se quitará el registro del",
				" ",
				pendingDelete ? formatLongDate(pendingDelete.date) : "mes",
				"."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				className: "bg-destructive text-destructive-foreground hover:opacity-90",
				onClick: () => {
					if (!pendingDelete) return;
					deleteRecord(yearStart, pendingDelete.id);
					toast.success("Registro eliminado.");
					setPendingDelete(null);
				},
				children: "Eliminar"
			})] })] })
		})
	] });
}
function NotesBlock({ yearStart, month, value }) {
	const setNotes = useAppStore((s) => s.setNotes);
	const [text, setText] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		setText(value);
	}, [
		value,
		month.id,
		yearStart
	]);
	(0, import_react.useEffect)(() => {
		const handle = window.setTimeout(() => {
			if (text !== value) setNotes(yearStart, month.id, text);
		}, 400);
		return () => window.clearTimeout(handle);
	}, [
		text,
		value,
		yearStart,
		month.id,
		setNotes
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
		className: "text-base",
		children: "Notas del mes"
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		value: text,
		onChange: (e) => setText(e.target.value),
		placeholder: "Comentarios, observaciones, metas o recordatorios. Se guardan solos."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-xs text-muted-foreground",
		children: "Guardado automático."
	})] })] });
}
function MonthRoute() {
	const { month: slug } = Route.useParams();
	const month = getMonthBySlug(slug);
	if (!month) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthView, { month });
}
//#endregion
export { MonthRoute as component };
