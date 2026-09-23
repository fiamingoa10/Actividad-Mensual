import { createFileRoute } from "@tanstack/react-router";
import { SearchView } from "@/components/search-view";

export const Route = createFileRoute("/buscar")({
  component: SearchView,
});
