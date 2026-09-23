import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  Clock,
  NotebookPen,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressMeter, ToneBadge } from "@/components/progress-meter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { monthRecords, monthStats, selectYear, useAppStore } from "@/lib/store";
import {
  MONTHLY_GOAL,
  currentMonthMeta,
  formatHours,
  formatPercent,
  getMonthById,
} from "@/lib/year";

export function DashboardView() {
  const yearStart = useAppStore((s) => s.academicYearStart);
  const years = useAppStore((s) => s.years);
  const lastNote = useAppStore((s) => s.lastNote);
  const month = currentMonthMeta();
  const year = selectYear({ years }, yearStart);
  const records = monthRecords(year, yearStart, month.id);
  const stats = monthStats(records);
  const remaining = stats.remaining;

  return (
    <AppShell>
      <section className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Mes actual
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            {month.name}
          </h1>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Horas acumuladas</p>
                <p className="font-display text-4xl font-medium tabular-nums tracking-tight">
                  {formatHours(stats.hours)}
                  <span className="ml-1 text-base font-sans font-normal text-muted-foreground">
                    h
                  </span>
                </p>
              </div>
              <ToneBadge percent={stats.percent} />
            </div>
            <ProgressMeter percent={stats.percent} size="lg" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Objetivo {MONTHLY_GOAL} h</span>
              <span className="tabular-nums">
                {remaining > 0
                  ? `${formatHours(remaining)} h restantes`
                  : "Objetivo cubierto"}
              </span>
            </div>
            {stats.percent >= 100 && stats.hours > MONTHLY_GOAL && (
              <p className="rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high">
                Has superado tu objetivo mensual por{" "}
                {formatHours(stats.hours - MONTHLY_GOAL)} horas.
              </p>
            )}
            {stats.percent >= 100 && stats.hours <= MONTHLY_GOAL && (
              <p className="rounded-xl bg-progress-high/10 px-3 py-2 text-sm text-progress-high">
                Felicitaciones. Objetivo mensual alcanzado.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Clock className="size-4" />}
            label="Horas del mes"
            value={`${formatHours(stats.hours)} h`}
          />
          <StatCard
            icon={<BookOpen className="size-4" />}
            label="Estudios"
            value={String(stats.studies)}
          />
          <StatCard
            icon={<Target className="size-4" />}
            label="Objetivo"
            value={`${MONTHLY_GOAL} h`}
          />
          <StatCard
            icon={<TrendingUp className="size-4" />}
            label="Avance"
            value={formatPercent(stats.percent)}
          />
        </div>

        <Card>
          <CardContent className="flex gap-3 p-5">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <NotebookPen className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">Última nota</p>
              {lastNote?.text ? (
                <>
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                    {lastNote.text}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {getMonthById(lastNote.monthId)?.name}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  Todavía no hay notas en este ciclo.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-2">
          <Button asChild className="w-full">
            <Link to="/mes/$month" params={{ month: month.slug }}>
              <Plus className="size-4" />
              Agregar registro
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/mes/$month" params={{ month: month.slug }}>
              <CalendarDays className="size-4" />
              Abrir {month.name}
            </Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          {icon}
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-medium tabular-nums tracking-tight">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
