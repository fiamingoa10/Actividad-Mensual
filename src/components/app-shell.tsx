import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  House,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import {
  academicYearLabel,
  currentMonthMeta,
  MONTHS,
} from "@/lib/year";

export function AppShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const yearStart = useAppStore((s) => s.academicYearStart);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const [open, setOpen] = useState(false);
  const monthSlug = currentMonthMeta().slug;
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const tabs = [
    {
      label: "Inicio",
      icon: House,
      active: pathname === "/",
      to: "/" as const,
      params: undefined,
    },
    {
      label: "Mes",
      icon: CalendarDays,
      active: pathname.startsWith("/mes"),
      to: "/mes/$month" as const,
      params: { month: monthSlug },
    },
    {
      label: "Año",
      icon: BarChart3,
      active: pathname.startsWith("/resumen"),
      to: "/resumen" as const,
      params: undefined,
    },
    {
      label: "Más",
      icon: Settings,
      active: pathname.startsWith("/ajustes") || pathname.startsWith("/buscar"),
      to: "/ajustes" as const,
      params: undefined,
    },
  ];

  return (
    <div className="flex min-h-dvh w-full max-w-lg flex-col bg-background">
      <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-background/90 px-3 py-2 backdrop-blur-md">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-tight">
            {title ?? "Actividad Mensual"}
          </p>
          <p className="text-xs text-muted-foreground">
            Ciclo {academicYearLabel(yearStart)}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/buscar" aria-label="Buscar registros">
            <Search className="size-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          onClick={() => setTheme(dark ? "light" : "dark")}
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="pt-2">
          <SheetHeader>
            <SheetTitle>Actividad Mensual</SheetTitle>
            <SheetDescription>Ciclo {academicYearLabel(yearStart)}</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-8">
            <DrawerLink
              to="/"
              active={pathname === "/"}
              onClick={() => setOpen(false)}
              icon={<House className="size-4" />}
            >
              Inicio
            </DrawerLink>
            <p className="mt-4 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Meses
            </p>
            {MONTHS.map((m) => (
              <DrawerLink
                key={m.slug}
                to="/mes/$month"
                params={{ month: m.slug }}
                active={pathname === `/mes/${m.slug}`}
                onClick={() => setOpen(false)}
                icon={<CalendarDays className="size-4" />}
              >
                {m.name}
              </DrawerLink>
            ))}
            <p className="mt-4 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Más
            </p>
            <DrawerLink
              to="/resumen"
              active={pathname.startsWith("/resumen")}
              onClick={() => setOpen(false)}
              icon={<BarChart3 className="size-4" />}
            >
              Resumen anual
            </DrawerLink>
            <DrawerLink
              to="/buscar"
              active={pathname.startsWith("/buscar")}
              onClick={() => setOpen(false)}
              icon={<Search className="size-4" />}
            >
              Buscar por fecha
            </DrawerLink>
            <DrawerLink
              to="/ajustes"
              active={pathname.startsWith("/ajustes")}
              onClick={() => setOpen(false)}
              icon={<Settings className="size-4" />}
            >
              Ajustes y copias
            </DrawerLink>
            <div className="mt-6 rounded-xl bg-secondary px-3 py-3 text-xs text-secondary-foreground">
              <p className="flex items-center gap-2 font-medium">
                <BookOpen className="size-3.5" />
                Objetivo
              </p>
              <p className="mt-1 text-muted-foreground">
                50 horas al mes · 600 horas al año
              </p>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 px-4 pb-28 pt-4">{children}</main>

      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-lg -translate-x-1/2 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <ul className="grid grid-cols-4">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  params={item.params}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
                    item.active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={item.active ? 2.25 : 1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function DrawerLink({
  to,
  params,
  active,
  onClick,
  icon,
  children,
}: {
  to: "/" | "/resumen" | "/buscar" | "/ajustes" | "/mes/$month";
  params?: { month: string };
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      params={params}
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-secondary",
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
