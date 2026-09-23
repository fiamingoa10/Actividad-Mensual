import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Eraser,
  ListOrdered,
  Pencil,
  Plus,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ProgressMeter, ToneBadge } from "@/components/progress-meter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  monthRecords,
  monthStats,
  selectYear,
  useAppStore,
  type ActivityRecord,
} from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  MONTHLY_GOAL,
  MONTHS,
  defaultDateForMonth,
  formatHours,
  formatLongDate,
  formatPercent,
  monthRange,
  type MonthMeta,
} from "@/lib/year";

export function MonthView({ month }: { month: MonthMeta }) {
  const yearStart = useAppStore((s) => s.academicYearStart);
  const years = useAppStore((s) => s.years);
  const resetMonth = useAppStore((s) => s.resetMonth);
  const year = selectYear({ years }, yearStart);
  const records = monthRecords(year, yearStart, month.id);
  const stats = monthStats(records);
  const notes = year.notes[month.id] ?? "";
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <AppShell title={month.name}>
      <div className="space-y-4">
        <MonthStrip current={month.slug} />

        <header>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            {month.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Registro, objetivo y notas del mes
          </p>
        </header>

        <GoalCard stats={stats} />
        <SummaryGrid stats={stats} />
        <RecordForm yearStart={yearStart} month={month} />
        <RecordList yearStart={yearStart} month={month} records={records} />
        <NotesBlock yearStart={yearStart} month={month} value={notes} />

        <Button
          variant="outline"
          className="w-full text-destructive hover:text-destructive"
          onClick={() => setResetOpen(true)}
        >
          <Eraser className="size-4" />
          Reiniciar {month.name}
        </Button>

        <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reiniciar {month.name}</AlertDialogTitle>
              <AlertDialogDescription>
                Se borrarán los registros y las notas de este mes. El resto del
                ciclo se mantiene.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                onClick={() => {
                  resetMonth(yearStart, month.id);
                  toast.success(`${month.name} se reinició.`);
                }}
              >
                Reiniciar mes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppShell>
  );
}

function MonthStrip({ current }: { current: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-1.5 pb-1">
        {MONTHS.map((m) => (
          <Link
            key={m.slug}
            to="/mes/$month"
            params={{ month: m.slug }}
            className={cn(
              "inline-flex h-9 shrink-0 items-center rounded-full px-3 text-xs font-medium transition-colors",
              m.slug === current
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {m.short}
          </Link>
        ))}
      </div>
    </div>
  );
}

function GoalCard({
  stats,
}: {
  stats: ReturnType<typeof monthStats>;
}) {
  const over = stats.hours - MONTHLY_GOAL;
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Objetivo mensual</p>
          <ToneBadge percent={stats.percent} />
        </div>
        <ProgressMeter percent={stats.percent} size="lg" />
        <div className="grid grid-cols-3 gap-2 text-center">
          <MiniStat label="Acumuladas" value={`${formatHours(stats.hours)} h`} />
          <MiniStat label="Restantes" value={`${formatHours(stats.remaining)} h`} />
          <MiniStat label="Meta" value={`${MONTHLY_GOAL} h`} />
        </div>
        {stats.percent >= 100 && over > 0 && (
          <p className="flex items-start gap-2 rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high">
            <Trophy className="mt-0.5 size-4 shrink-0" />
            Has superado tu objetivo mensual por {formatHours(over)} horas.
          </p>
        )}
        {stats.percent >= 100 && over <= 0 && (
          <p className="flex items-start gap-2 rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            Felicitaciones. Objetivo mensual alcanzado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary px-2 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="font-medium tabular-nums">{value}</p>
    </div>
  );
}

function SummaryGrid({ stats }: { stats: ReturnType<typeof monthStats> }) {
  const items = [
    { icon: Clock, label: "Total de horas", value: `${formatHours(stats.hours)} h` },
    { icon: BookOpen, label: "Total de estudios", value: String(stats.studies) },
    { icon: ListOrdered, label: "Registros", value: String(stats.count) },
    { icon: Target, label: "Porcentaje", value: formatPercent(stats.percent) },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="space-y-1.5 p-4">
            <item.icon className="size-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-display text-xl font-medium tabular-nums tracking-tight">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function parseHours(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!normalized) return null;
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 10) / 10;
}

function parseStudies(raw: string): number | null {
  const normalized = raw.trim();
  if (!normalized) return null;
  if (!/^\d+$/.test(normalized)) return null;
  return Number(normalized);
}

function validateRecord(date: string, hoursRaw: string, studiesRaw: string, min: string, max: string) {
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

function RecordForm({
  yearStart,
  month,
}: {
  yearStart: number;
  month: MonthMeta;
}) {
  const addRecord = useAppStore((s) => s.addRecord);
  const range = useMemo(
    () => monthRange(yearStart, month.id),
    [yearStart, month.id],
  );
  const [date, setDate] = useState(defaultDateForMonth(yearStart, month.id));
  const [hours, setHours] = useState("");
  const [studies, setStudies] = useState("");

  useEffect(() => {
    setDate(defaultDateForMonth(yearStart, month.id));
    setHours("");
    setStudies("");
  }, [yearStart, month.id]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validateRecord(date, hours, studies, range.min, range.max);
    if (error) {
      toast.error(error);
      return;
    }
    addRecord(yearStart, {
      date,
      hours: parseHours(hours) ?? 0,
      studies: parseStudies(studies) ?? 0,
    });
    toast.success("Registro agregado.");
    setHours("");
    setStudies("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Nuevo registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-3">
          <Field label="Fecha" htmlFor="rec-date">
            <Input
              id="rec-date"
              type="date"
              value={date}
              min={range.min}
              max={range.max}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Horas" htmlFor="rec-hours">
              <Input
                id="rec-hours"
                inputMode="decimal"
                placeholder="0,0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </Field>
            <Field label="Estudios" htmlFor="rec-studies">
              <Input
                id="rec-studies"
                inputMode="numeric"
                placeholder="0"
                value={studies}
                onChange={(e) => setStudies(e.target.value)}
              />
            </Field>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="size-4" />
            Agregar registro
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function RecordList({
  yearStart,
  month,
  records,
}: {
  yearStart: number;
  month: MonthMeta;
  records: ActivityRecord[];
}) {
  const updateRecord = useAppStore((s) => s.updateRecord);
  const deleteRecord = useAppStore((s) => s.deleteRecord);
  const [editing, setEditing] = useState<ActivityRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ActivityRecord | null>(null);
  const range = monthRange(yearStart, month.id);

  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [studies, setStudies] = useState("");

  function openEdit(rec: ActivityRecord) {
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
      studies: parseStudies(studies) ?? 0,
    });
    toast.success("Registro actualizado.");
    setEditing(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Registros</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        {records.length === 0 ? (
          <p className="px-5 pb-5 text-sm text-muted-foreground">
            No hay registros en {month.name}. Agrega el primero con el formulario.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {records.map((rec) => (
              <li key={rec.id} className="flex items-center gap-2 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium capitalize">
                    {formatLongDate(rec.date)}
                  </p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {formatHours(rec.hours)} h · {rec.studies} estudios
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Editar registro"
                  onClick={() => openEdit(rec)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Eliminar registro"
                  onClick={() => setPendingDelete(rec)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar registro</DialogTitle>
            <DialogDescription>Los cambios se guardan en este dispositivo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Fecha" htmlFor="edit-date">
              <Input
                id="edit-date"
                type="date"
                value={date}
                min={range.min}
                max={range.max}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Horas" htmlFor="edit-hours">
                <Input
                  id="edit-hours"
                  inputMode="decimal"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </Field>
              <Field label="Estudios" htmlFor="edit-studies">
                <Input
                  id="edit-studies"
                  inputMode="numeric"
                  value={studies}
                  onChange={(e) => setStudies(e.target.value)}
                />
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={saveEdit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar registro</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se quitará el registro del{" "}
              {pendingDelete ? formatLongDate(pendingDelete.date) : "mes"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:opacity-90"
              onClick={() => {
                if (!pendingDelete) return;
                deleteRecord(yearStart, pendingDelete.id);
                toast.success("Registro eliminado.");
                setPendingDelete(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function NotesBlock({
  yearStart,
  month,
  value,
}: {
  yearStart: number;
  month: MonthMeta;
  value: string;
}) {
  const setNotes = useAppStore((s) => s.setNotes);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value, month.id, yearStart]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (text !== value) setNotes(yearStart, month.id, text);
    }, 400);
    return () => window.clearTimeout(handle);
  }, [text, value, yearStart, month.id, setNotes]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notas del mes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comentarios, observaciones, metas o recordatorios. Se guardan solos."
        />
        <p className="mt-2 text-xs text-muted-foreground">Guardado automático.</p>
      </CardContent>
    </Card>
  );
}
