import { useEffect } from "react";
import { applyTheme, useAppStore } from "@/lib/store";

export function ThemeSync() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(useAppStore.getState().theme);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return null;
}
