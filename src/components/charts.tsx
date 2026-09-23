import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANNUAL_GOAL, MONTHLY_GOAL, formatHours } from "@/lib/year";
import { yearStats } from "@/lib/store";

type YearStats = ReturnType<typeof yearStats>;

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function ChartFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-56 w-full">{children}</div>
      </CardContent>
    </Card>
  );
}

function ChartTip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  suffix: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-card">
      <p className="font-medium">{label}</p>
      <p className="tabular-nums text-muted-foreground">
        {formatHours(Number(payload[0]?.value ?? 0))} {suffix}
      </p>
    </div>
  );
}

export function YearCharts({ stats }: { stats: YearStats }) {
  const mounted = useMounted();
  const barData = stats.rows.map((r) => ({
    short: r.short,
    name: r.name,
    hours: Math.round(r.hours * 10) / 10,
    studies: r.studies,
  }));

  let running = 0;
  const progressData = stats.rows.map((r) => {
    running += r.hours;
    return {
      short: r.short,
      name: r.name,
      acumulado: Math.round(running * 10) / 10,
    };
  });

  const pieData = [
    { name: "Cumplidos", value: stats.met },
    { name: "Pendientes", value: stats.pending },
  ];

  if (!mounted) {
    return (
      <div className="grid gap-3">
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const tick = { fill: "var(--color-muted-foreground)", fontSize: 11 };
  const grid = "var(--color-border)";
  const primary = "var(--color-primary)";
  const ink = "var(--color-foreground)";

  return (
    <div className="grid gap-3">
      <ChartFrame title="Horas por mes">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="short" tick={tick} axisLine={false} tickLine={false} />
            <YAxis tick={tick} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "var(--color-secondary)" }}
              content={<ChartTip suffix="h" />}
            />
            <ReferenceLine
              y={MONTHLY_GOAL}
              stroke={ink}
              strokeDasharray="4 4"
              strokeOpacity={0.35}
            />
            <Bar dataKey="hours" fill={primary} radius={[6, 6, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>

      <ChartFrame title="Estudios por mes">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="short" tick={tick} axisLine={false} tickLine={false} />
            <YAxis tick={tick} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "var(--color-secondary)" }}
              content={<ChartTip suffix="estudios" />}
            />
            <Bar dataKey="studies" fill={ink} radius={[6, 6, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>

      <ChartFrame title="Progreso anual acumulado">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="short" tick={tick} axisLine={false} tickLine={false} />
            <YAxis tick={tick} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip suffix="h acumuladas" />} />
            <ReferenceLine
              y={ANNUAL_GOAL}
              stroke="var(--color-progress-high)"
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="acumulado"
              stroke={primary}
              strokeWidth={2.4}
              dot={{ r: 3, fill: primary }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>

      <ChartFrame title="Meses con objetivo alcanzado">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill="var(--color-progress-high)" />
              <Cell fill="var(--color-secondary)" />
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const item = payload[0];
                return (
                  <div className="rounded-lg bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-card">
                    {item.name}: {item.value}
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-progress-high" />
            Cumplidos ({stats.met})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-secondary" />
            Pendientes ({stats.pending})
          </span>
        </div>
      </ChartFrame>
    </div>
  );
}
