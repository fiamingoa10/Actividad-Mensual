import { createFileRoute } from "@tanstack/react-router";
import { AnnualView } from "@/components/annual-view";

export const Route = createFileRoute("/resumen")({
  component: AnnualView,
});
