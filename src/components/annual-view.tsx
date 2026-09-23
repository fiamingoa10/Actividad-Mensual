import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarCheck,
  CalendarClock,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { YearCharts } from "@/components/charts";
import { ProgressMeter, ToneBadge } from "@/components/progress-meter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectYear, useAppStore, yearStats } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  ANNUAL_GOAL,
  academicYearLabel,
  formatHours,
  formatPercent,
} from "@/lib/year";

export function AnnualView() {
  const yearStart = useAppStore((s) => s.academicYearStart);
  const years = useAppStore((s) => s.years);
  const year = selectYear({ years }, yearStart);
  const stats = yearStats(year, yearStart);

  return (
    <AppShell title="Resumen anual">
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            Resumen anual
          </h1>
          <p className="text-sm text-muted-foreground">
            Ciclo {academicYearLabel(yearStart)} · objetivo {ANNUAL_GOAL} h
          </p>
        </header>

        <Card>
          <CardContent className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Total de horas</p>
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
            <p className="text-xs text-muted-foreground">
              {stats.remaining > 0
                ? `${formatHours(stats.remaining)} h para las ${ANNUAL_GOAL}`
                : "Objetivo anual cubierto"}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Mini
            icon={Clock}
            label="Horas"
            value={`${formatHours(stats.hours)} h`}
          />
          <Mini
            icon={BookOpen}
            label="Estudios"
            value={String(stats.studies)}
          />
          <Mini icon={Target} label="Objetivo" value={`${ANNUAL_GOAL} h`} />
          <Mini
            icon={TrendingUp}
            label="Progreso"
            value={formatPercent(stats.percent)}
          />
          <Mini
            icon={CalendarCheck}
            label="Meses cumplidos"
            value={String(stats.met)}
          />
          <Mini
            icon={CalendarClock}
            label="Meses pendientes"
            value={String(stats.pending)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Mini
            icon={Clock}
            label="Promedio horas"
            value={`${formatHours(stats.avgHours)} h`}
          />
          <Mini
            icon={BookOpen}
            label="Promedio estudios"
            value={formatHours(stats.avgStudies)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tabla del ciclo</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0 pb-2">
            <table className="w-full min-w-[18rem] text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Mes</th>
                  <th className="px-2 py-2 font-medium tabular-nums">Horas</th>
                  <th className="px-2 py-2 font-medium tabular-nums">Estudios</th>
                  <th className="px-4 py-2 font-medium">%</th>
                </tr>
              </thead>
              <tbody>
                {stats.rows.map((row) => (
                  <tr key={row.slug} className="border-t border-border">
                    <td className="px-4 py-2.5">
                      <Link
                        to="/mes/$month"
                        params={{ month: row.slug }}
                        className="font-medium text-primary"
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 tabular-nums">
                      {formatHours(row.hours)}
                    </td>
                    <td className="px-2 py-2.5 tabular-nums">{row.studies}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={cn(
                          "tabular-nums",
                          row.met ? "text-progress-high" : "text-muted-foreground",
                        )}
                      >
                        {formatPercent(row.percent)}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-border bg-secondary/60 font-medium">
                  <td className="px-4 py-2.5">Total general</td>
                  <td className="px-2 py-2.5 tabular-nums">
                    {formatHours(stats.hours)}
                  </td>
                  <td className="px-2 py-2.5 tabular-nums">{stats.studies}</td>
                  <td className="px-4 py-2.5 tabular-nums">
                    {formatPercent(stats.percent)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <YearCharts stats={stats} />
      </div>
    </AppShell>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-1.5 p-4">
        <Icon className="size-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-medium tabular-nums tracking-tight">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
