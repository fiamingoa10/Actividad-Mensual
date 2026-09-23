import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectYear, useAppStore } from "@/lib/store";
import {
  formatHours,
  formatLongDate,
  getMonthById,
  isoToday,
} from "@/lib/year";

export function SearchView() {
  const yearStart = useAppStore((s) => s.academicYearStart);
  const years = useAppStore((s) => s.years);
  const year = selectYear({ years }, yearStart);
  const [date, setDate] = useState(isoToday());

  const matches = useMemo(
    () =>
      year.records
        .filter((r) => r.date === date)
        .sort((a, b) => b.id.localeCompare(a.id)),
    [year.records, date],
  );

  const month = date ? getMonthById(Number(date.slice(5, 7))) : undefined;

  return (
    <AppShell title="Buscar">
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-3xl font-medium tracking-tight">
            Buscar por fecha
          </h1>
          <p className="text-sm text-muted-foreground">
            Encuentra registros exactos del ciclo actual.
          </p>
        </header>

        <Card>
          <CardContent className="space-y-2 p-5">
            <Label htmlFor="search-date">Fecha</Label>
            <Input
              id="search-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CardContent>
        </Card>

        {matches.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-2 px-5 py-10 text-center">
              <Search className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No hay registros el {date ? formatLongDate(date) : "día elegido"}.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-2">
            {matches.map((rec) => (
              <li key={rec.id}>
                <Card>
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {formatLongDate(rec.date)}
                      </p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {formatHours(rec.hours)} h · {rec.studies} estudios
                      </p>
                    </div>
                    {month && (
                      <Link
                        to="/mes/$month"
                        params={{ month: month.slug }}
                        className="text-sm font-medium text-primary"
                      >
                        {month.name}
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
