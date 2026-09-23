import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Download,
  Eraser,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  Upload,
  WandSparkles,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { downloadBackup, downloadExcel, downloadPdf } from "@/lib/export";
import { isBackupPayload, useAppStore } from "@/lib/store";
import {
  academicYearLabel,
  academicYearStart,
  currentMonthMeta,
  getMonthById,
} from "@/lib/year";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const store = useAppStore();
  const yearStart = store.academicYearStart;
  const theme = store.theme;
  const fileRef = useRef<HTMLInputElement>(null);
  const [resetMonthOpen, setResetMonthOpen] = useState(false);
  const [resetYearOpen, setResetYearOpen] = useState(false);
  const currentMonth = currentMonthMeta();
  const currentYearNow = academicYearStart();

  const years = Array.from(
    new Set([
      currentYearNow,
      currentYearNow - 1,
      yearStart,
      ...Object.keys(store.years).map(Number),
    ]),
  )
    .filter((y) => Number.isFinite(y))
    .sort((a, b) => b - a);

  function onRestore(file: File) {
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

  return (
    <AppShell title="Ajustes">
      <div className="space-y-4">
        <header>
          <h1 className="font-display text-3xl font-medium tracking-tight">Ajustes</h1>
          <p className="text-sm text-muted-foreground">
            Apariencia, exportaciones y copias de seguridad.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Apariencia</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {(
              [
                ["light", "Claro"],
                ["dark", "Oscuro"],
                ["system", "Sistema"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => store.setTheme(value)}
                className={cn(
                  "h-11 rounded-xl text-sm font-medium transition-colors",
                  theme === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ciclo académico</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => store.setAcademicYearStart(y)}
                className={cn(
                  "h-11 rounded-xl px-3 text-sm font-medium tabular-nums transition-colors",
                  yearStart === y
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {academicYearLabel(y)}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exportar</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                try {
                  downloadPdf(useAppStore.getState());
                  toast.success("PDF descargado.");
                } catch {
                  toast.error("No se pudo generar el PDF.");
                }
              }}
            >
              <FileText className="size-4" />
              Exportar a PDF
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                try {
                  downloadExcel(useAppStore.getState());
                  toast.success("Excel descargado.");
                } catch {
                  toast.error("No se pudo generar el Excel.");
                }
              }}
            >
              <FileSpreadsheet className="size-4" />
              Exportar a Excel
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Copia de seguridad</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                downloadBackup(useAppStore.getState());
                toast.success("Copia descargada.");
              }}
            >
              <Download className="size-4" />
              Crear copia de seguridad
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="size-4" />
              Restaurar copia
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onRestore(file);
                e.target.value = "";
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                store.loadDemo(yearStart);
                toast.success("Datos de ejemplo cargados.");
              }}
            >
              <WandSparkles className="size-4" />
              Cargar datos de ejemplo
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => setResetMonthOpen(true)}
            >
              <Eraser className="size-4" />
              Reiniciar {currentMonth.name}
            </Button>
            <Button
              variant="outline"
              className="justify-start text-destructive hover:text-destructive"
              onClick={() => setResetYearOpen(true)}
            >
              <RotateCcw className="size-4" />
              Reiniciar todo el año
            </Button>
          </CardContent>
        </Card>

        <p className="pb-2 text-center text-xs text-muted-foreground">
          Los datos se guardan solo en este teléfono. Ciclo{" "}
          {academicYearLabel(yearStart)}.
        </p>
      </div>

      <AlertDialog open={resetMonthOpen} onOpenChange={setResetMonthOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar {currentMonth.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Se borrarán los registros y las notas de{" "}
              {getMonthById(currentMonth.id)?.name}. El resto del ciclo se mantiene.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:opacity-90"
              onClick={() => {
                store.resetMonth(yearStart, currentMonth.id);
                toast.success(`${currentMonth.name} se reinició.`);
              }}
            >
              Reiniciar mes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetYearOpen} onOpenChange={setResetYearOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar el ciclo</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán horas, estudios y notas de{" "}
              {academicYearLabel(yearStart)}. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:opacity-90"
              onClick={() => {
                store.resetYear(yearStart);
                toast.success("El ciclo se reinició.");
              }}
            >
              Reiniciar año
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}

