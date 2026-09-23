import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { downloadBlob } from "@/lib/utils";
import {
  academicYearLabel,
  ANNUAL_GOAL,
  formatHours,
  formatPercent,
  MONTHLY_GOAL,
  MONTHS,
  getMonthById,
} from "@/lib/year";
import {
  monthRecords,
  monthStats,
  selectYear,
  yearStats,
  type AppStore,
  type BackupPayload,
} from "@/lib/store";

function fileStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

export function buildBackup(state: AppStore): BackupPayload {
  return {
    app: "actividad-mensual",
    version: 1,
    exportedAt: new Date().toISOString(),
    theme: state.theme,
    academicYearStart: state.academicYearStart,
    years: state.years,
    lastNote: state.lastNote,
  };
}

export function downloadBackup(state: AppStore) {
  const payload = buildBackup(state);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `actividad-mensual-${fileStamp()}.json`);
}

export function downloadExcel(state: AppStore) {
  const yearStart = state.academicYearStart;
  const year = selectYear(state, yearStart);
  const stats = yearStats(year, yearStart);
  const label = academicYearLabel(yearStart);

  const resumenRows = [
    ["Mes", "Horas", "Estudios", "% Objetivo", "Registros", "Estado"],
    ...stats.rows.map((row) => [
      row.name,
      Math.round(row.hours * 10) / 10,
      row.studies,
      Math.round(row.percent),
      row.count,
      row.met ? "Cumplido" : "Pendiente",
    ]),
    [
      "TOTAL GENERAL",
      Math.round(stats.hours * 10) / 10,
      stats.studies,
      Math.round(stats.percent),
      stats.count,
      "",
    ],
  ];

  const registroRows = [
    ["Fecha", "Mes", "Horas", "Estudios"],
    ...[...year.records]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((r) => {
        const monthNum = Number(r.date.slice(5, 7));
        const month = getMonthById(monthNum);
        return [r.date, month?.name ?? "", Math.round(r.hours * 10) / 10, r.studies];
      }),
  ];

  const notasRows = [
    ["Mes", "Notas"],
    ...MONTHS.map((m) => [m.name, year.notes[m.id] ?? ""]),
  ];

  const wb = XLSX.utils.book_new();
  const wsResumen = XLSX.utils.aoa_to_sheet(resumenRows);
  const wsRegistros = XLSX.utils.aoa_to_sheet(registroRows);
  const wsNotas = XLSX.utils.aoa_to_sheet(notasRows);
  XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");
  XLSX.utils.book_append_sheet(wb, wsRegistros, "Registros");
  XLSX.utils.book_append_sheet(wb, wsNotas, "Notas");

  const meta = XLSX.utils.aoa_to_sheet([
    ["Actividad Mensual"],
    ["Ciclo", label],
    ["Objetivo mensual (h)", MONTHLY_GOAL],
    ["Objetivo anual (h)", ANNUAL_GOAL],
    ["Total horas", Math.round(stats.hours * 10) / 10],
    ["Total estudios", stats.studies],
    ["Meses cumplidos", stats.met],
    ["Meses pendientes", stats.pending],
    ["Promedio horas", Math.round(stats.avgHours * 10) / 10],
    ["Promedio estudios", Math.round(stats.avgStudies * 10) / 10],
  ]);
  XLSX.utils.book_append_sheet(wb, meta, "Portada");

  XLSX.writeFile(wb, `actividad-mensual-${label.replace("–", "-")}.xlsx`);
}

export function downloadPdf(state: AppStore) {
  const yearStart = state.academicYearStart;
  const year = selectYear(state, yearStart);
  const stats = yearStats(year, yearStart);
  const label = academicYearLabel(yearStart);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
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
  const cards = [
    [`Horas`, formatHours(stats.hours)],
    [`Estudios`, String(stats.studies)],
    [`Objetivo anual`, `${ANNUAL_GOAL} h`],
    [`Progreso`, formatPercent(stats.percent)],
    [`Meses cumplidos`, String(stats.met)],
    [`Meses pendientes`, String(stats.pending)],
  ];
  cards.forEach((card, i) => {
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
    head: [["Mes", "Horas", "Estudios", "% Objetivo"]],
    body: [
      ...stats.rows.map((row) => [
        row.name,
        formatHours(row.hours),
        String(row.studies),
        formatPercent(row.percent),
      ]),
      [
        "TOTAL GENERAL",
        formatHours(stats.hours),
        String(stats.studies),
        formatPercent(stats.percent),
      ],
    ],
    styles: { font: "helvetica", fontSize: 9, cellPadding: 2.4 },
    headStyles: { fillColor: [26, 86, 219], textColor: 255, fontStyle: "bold" },
    footStyles: { fillColor: [243, 245, 248], textColor: [18, 24, 38], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [247, 249, 252] },
  });

  let after = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
    ?.finalY ?? 160;

  if (after > 240) {
    doc.addPage();
    after = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(18, 24, 38);
  doc.text("Registros", 14, after + 12);

  const recordBody = [...year.records]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => {
      const monthNum = Number(r.date.slice(5, 7));
      const month = getMonthById(monthNum);
      return [r.date, month?.name ?? "", formatHours(r.hours), String(r.studies)];
    });

  autoTable(doc, {
    startY: after + 16,
    head: [["Fecha", "Mes", "Horas", "Estudios"]],
    body: recordBody.length ? recordBody : [["—", "Sin registros", "0", "0"]],
    styles: { font: "helvetica", fontSize: 8.5, cellPadding: 2 },
    headStyles: { fillColor: [26, 86, 219], textColor: 255 },
    alternateRowStyles: { fillColor: [247, 249, 252] },
  });

  after =
    (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ??
    after;

  if (after > 230) {
    doc.addPage();
    after = 20;
  } else {
    after += 12;
  }

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
