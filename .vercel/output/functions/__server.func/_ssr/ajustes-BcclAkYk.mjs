import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as currentMonthMeta, b as yearStats, f as isBackupPayload, g as monthStats, h as monthRecords, l as formatPercent, n as academicYearLabel, r as academicYearStart, s as formatHours, t as MONTHS, u as getMonthById, v as selectYear, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { C as Download, S as Eraser, b as FileText, f as RotateCcw, n as WandSparkles, r as Upload, x as FileSpreadsheet } from "../_libs/lucide-react.mjs";
import { a as CardHeader, c as cn, i as CardContent, l as downloadBlob, n as Button, o as CardTitle, r as Card, t as AppShell } from "./card-DsUKmRGs.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CsZS0xWP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ajustes-BcclAkYk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = require_jspdf_node_min();
function fileStamp() {
	const d = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}
function buildBackup(state) {
	return {
		app: "actividad-mensual",
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		theme: state.theme,
		academicYearStart: state.academicYearStart,
		years: state.years,
		lastNote: state.lastNote
	};
}
function downloadBackup(state) {
	const payload = buildBackup(state);
	const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
	downloadBlob(blob, `actividad-mensual-${fileStamp()}.json`);
}
function downloadExcel(state) {
	const yearStart = state.academicYearStart;
	const year = selectYear(state, yearStart);
	const stats = yearStats(year, yearStart);
	const label = academicYearLabel(yearStart);
	const resumenRows = [
		[
			"Mes",
			"Horas",
			"Estudios",
			"% Objetivo",
			"Registros",
			"Estado"
		],
		...stats.rows.map((row) => [
			row.name,
			Math.round(row.hours * 10) / 10,
			row.studies,
			Math.round(row.percent),
			row.count,
			row.met ? "Cumplido" : "Pendiente"
		]),
		[
			"TOTAL GENERAL",
			Math.round(stats.hours * 10) / 10,
			stats.studies,
			Math.round(stats.percent),
			stats.count,
			""
		]
	];
	const registroRows = [[
		"Fecha",
		"Mes",
		"Horas",
		"Estudios"
	], ...[...year.records].sort((a, b) => a.date.localeCompare(b.date)).map((r) => {
		const monthNum = Number(r.date.slice(5, 7));
		const month = getMonthById(monthNum);
		return [
			r.date,
			month?.name ?? "",
			Math.round(r.hours * 10) / 10,
			r.studies
		];
	})];
	const notasRows = [["Mes", "Notas"], ...MONTHS.map((m) => [m.name, year.notes[m.id] ?? ""])];
	const wb = utils.book_new();
	const wsResumen = utils.aoa_to_sheet(resumenRows);
	const wsRegistros = utils.aoa_to_sheet(registroRows);
	const wsNotas = utils.aoa_to_sheet(notasRows);
	utils.book_append_sheet(wb, wsResumen, "Resumen");
	utils.book_append_sheet(wb, wsRegistros, "Registros");
	utils.book_append_sheet(wb, wsNotas, "Notas");
	const meta = utils.aoa_to_sheet([
		["Actividad Mensual"],
		["Ciclo", label],
		["Objetivo mensual (h)", 50],
		["Objetivo anual (h)", 600],
		["Total horas", Math.round(stats.hours * 10) / 10],
		["Total estudios", stats.studies],
		["Meses cumplidos", stats.met],
		["Meses pendientes", stats.pending],
		["Promedio horas", Math.round(stats.avgHours * 10) / 10],
		["Promedio estudios", Math.round(stats.avgStudies * 10) / 10]
	]);
	utils.book_append_sheet(wb, meta, "Portada");
	writeFileSync(wb, `actividad-mensual-${label.replace("–", "-")}.xlsx`);
}
function downloadPdf(state) {
	const yearStart = state.academicYearStart;
	const year = selectYear(state, yearStart);
	const stats = yearStats(year, yearStart);
	const label = academicYearLabel(yearStart);
	const doc = new import_jspdf_node_min.jsPDF({
		unit: "mm",
		format: "a4"
	});
	const pageW = doc.internal.pageSize.getWidth();
	doc.setFillColor(26, 86, 219);
	doc.rect(0, 0, pageW, 28, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(18);
	doc.text("Actividad Mensual", 14, 14);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(11);
	doc.text(`Ciclo ${label}`, 14, 22);
	doc.setTextColor(18, 24, 38);
	doc.setFontSize(11);
	let y = 40;
	[
		[`Horas`, formatHours(stats.hours)],
		[`Estudios`, String(stats.studies)],
		[`Objetivo anual`, `600 h`],
		[`Progreso`, formatPercent(stats.percent)],
		[`Meses cumplidos`, String(stats.met)],
		[`Meses pendientes`, String(stats.pending)]
	].forEach((card, i) => {
		const col = i % 3;
		const row = Math.floor(i / 3);
		const x = 14 + col * 62;
		const cy = y + row * 18;
		doc.setDrawColor(220, 226, 234);
		doc.setFillColor(247, 249, 252);
		doc.roundedRect(x, cy, 58, 16, 2, 2, "FD");
		doc.setFontSize(8);
		doc.setTextColor(92, 101, 115);
		doc.text(card[0], x + 3, cy + 6);
		doc.setFontSize(12);
		doc.setTextColor(18, 24, 38);
		doc.setFont("helvetica", "bold");
		doc.text(card[1], x + 3, cy + 13);
		doc.setFont("helvetica", "normal");
	});
	y = 80;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.text("Resumen por mes", 14, y);
	autoTable(doc, {
		startY: y + 4,
		head: [[
			"Mes",
			"Horas",
			"Estudios",
			"% Objetivo"
		]],
		body: [...stats.rows.map((row) => [
			row.name,
			formatHours(row.hours),
			String(row.studies),
			formatPercent(row.percent)
		]), [
			"TOTAL GENERAL",
			formatHours(stats.hours),
			String(stats.studies),
			formatPercent(stats.percent)
		]],
		styles: {
			font: "helvetica",
			fontSize: 9,
			cellPadding: 2.4
		},
		headStyles: {
			fillColor: [
				26,
				86,
				219
			],
			textColor: 255,
			fontStyle: "bold"
		},
		footStyles: {
			fillColor: [
				243,
				245,
				248
			],
			textColor: [
				18,
				24,
				38
			],
			fontStyle: "bold"
		},
		alternateRowStyles: { fillColor: [
			247,
			249,
			252
		] }
	});
	let after = doc.lastAutoTable?.finalY ?? 160;
	if (after > 240) {
		doc.addPage();
		after = 20;
	}
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.setTextColor(18, 24, 38);
	doc.text("Registros", 14, after + 12);
	const recordBody = [...year.records].sort((a, b) => a.date.localeCompare(b.date)).map((r) => {
		const monthNum = Number(r.date.slice(5, 7));
		const month = getMonthById(monthNum);
		return [
			r.date,
			month?.name ?? "",
			formatHours(r.hours),
			String(r.studies)
		];
	});
	autoTable(doc, {
		startY: after + 16,
		head: [[
			"Fecha",
			"Mes",
			"Horas",
			"Estudios"
		]],
		body: recordBody.length ? recordBody : [[
			"—",
			"Sin registros",
			"0",
			"0"
		]],
		styles: {
			font: "helvetica",
			fontSize: 8.5,
			cellPadding: 2
		},
		headStyles: {
			fillColor: [
				26,
				86,
				219
			],
			textColor: 255
		},
		alternateRowStyles: { fillColor: [
			247,
			249,
			252
		] }
	});
	after = doc.lastAutoTable?.finalY ?? after;
	if (after > 230) {
		doc.addPage();
		after = 20;
	} else after += 12;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.text("Notas del ciclo", 14, after + 8);
	let ny = after + 14;
	MONTHS.forEach((m) => {
		const note = (year.notes[m.id] ?? "").trim();
		if (!note) return;
		const monthRecs = monthRecords(year, yearStart, m.id);
		const ms = monthStats(monthRecs);
		const wrapped = doc.splitTextToSize(note, pageW - 28);
		const blockH = 8 + wrapped.length * 4.2;
		if (ny + blockH > 280) {
			doc.addPage();
			ny = 20;
		}
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.text(`${m.name}  ·  ${formatHours(ms.hours)} h`, 14, ny);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(60, 68, 80);
		doc.text(wrapped, 14, ny + 5);
		doc.setTextColor(18, 24, 38);
		ny += blockH + 4;
	});
	doc.save(`actividad-mensual-${label.replace("–", "-")}.pdf`);
}
function SettingsView() {
	const store = useAppStore();
	const yearStart = store.academicYearStart;
	const theme = store.theme;
	const fileRef = (0, import_react.useRef)(null);
	const [resetMonthOpen, setResetMonthOpen] = (0, import_react.useState)(false);
	const [resetYearOpen, setResetYearOpen] = (0, import_react.useState)(false);
	const currentMonth = currentMonthMeta();
	const currentYearNow = academicYearStart();
	const years = Array.from(/* @__PURE__ */ new Set([
		currentYearNow,
		currentYearNow - 1,
		yearStart,
		...Object.keys(store.years).map(Number)
	])).filter((y) => Number.isFinite(y)).sort((a, b) => b - a);
	function onRestore(file) {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const parsed = JSON.parse(String(reader.result));
				if (!isBackupPayload(parsed)) {
					toast.error("El archivo no es una copia válida.");
					return;
				}
				store.replaceFromBackup(parsed);
				toast.success("Copia restaurada.");
			} catch {
				toast.error("No se pudo leer el archivo.");
			}
		};
		reader.readAsText(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Ajustes",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium tracking-tight",
						children: "Ajustes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Apariencia, exportaciones y copias de seguridad."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Apariencia"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid grid-cols-3 gap-2",
						children: [
							["light", "Claro"],
							["dark", "Oscuro"],
							["system", "Sistema"]
						].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => store.setTheme(value),
							className: cn("h-11 rounded-xl text-sm font-medium transition-colors", theme === value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
							children: label
						}, value))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Ciclo académico"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-wrap gap-2",
						children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => store.setAcademicYearStart(y),
							className: cn("h-11 rounded-xl px-3 text-sm font-medium tabular-nums transition-colors", yearStart === y ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
							children: academicYearLabel(y)
						}, y))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Exportar"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "justify-start",
							onClick: () => {
								try {
									downloadPdf(useAppStore.getState());
									toast.success("PDF descargado.");
								} catch {
									toast.error("No se pudo generar el PDF.");
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Exportar a PDF"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "justify-start",
							onClick: () => {
								try {
									downloadExcel(useAppStore.getState());
									toast.success("Excel descargado.");
								} catch {
									toast.error("No se pudo generar el Excel.");
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), "Exportar a Excel"]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Copia de seguridad"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start",
								onClick: () => {
									downloadBackup(useAppStore.getState());
									toast.success("Copia descargada.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Crear copia de seguridad"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start",
								onClick: () => fileRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Restaurar copia"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "application/json,.json",
								className: "hidden",
								onChange: (e) => {
									const file = e.target.files?.[0];
									if (file) onRestore(file);
									e.target.value = "";
								}
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Datos"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start",
								onClick: () => {
									store.loadDemo(yearStart);
									toast.success("Datos de ejemplo cargados.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4" }), "Cargar datos de ejemplo"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start",
								onClick: () => setResetMonthOpen(true),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" }),
									"Reiniciar ",
									currentMonth.name
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "justify-start text-destructive hover:text-destructive",
								onClick: () => setResetYearOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reiniciar todo el año"]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pb-2 text-center text-xs text-muted-foreground",
						children: [
							"Los datos se guardan solo en este teléfono. Ciclo",
							" ",
							academicYearLabel(yearStart),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: resetMonthOpen,
				onOpenChange: setResetMonthOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: ["Reiniciar ", currentMonth.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"Se borrarán los registros y las notas de",
					" ",
					getMonthById(currentMonth.id)?.name,
					". El resto del ciclo se mantiene."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:opacity-90",
					onClick: () => {
						store.resetMonth(yearStart, currentMonth.id);
						toast.success(`${currentMonth.name} se reinició.`);
					},
					children: "Reiniciar mes"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: resetYearOpen,
				onOpenChange: setResetYearOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reiniciar el ciclo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"Se eliminarán horas, estudios y notas de",
					" ",
					academicYearLabel(yearStart),
					". Esta acción no se puede deshacer."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:opacity-90",
					onClick: () => {
						store.resetYear(yearStart);
						toast.success("El ciclo se reinició.");
					},
					children: "Reiniciar año"
				})] })] })
			})
		]
	});
}
var SplitComponent = SettingsView;
//#endregion
export { SplitComponent as component };
