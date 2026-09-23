import { createFileRoute, redirect } from "@tanstack/react-router";
import { MonthView } from "@/components/month-view";
import { currentMonthMeta, getMonthBySlug } from "@/lib/year";

export const Route = createFileRoute("/mes/$month")({
  beforeLoad: ({ params }) => {
    const month = getMonthBySlug(params.month);
    if (!month) {
      throw redirect({
        to: "/mes/$month",
        params: { month: currentMonthMeta().slug },
      });
    }
  },
  component: MonthRoute,
});

function MonthRoute() {
  const { month: slug } = Route.useParams();
  const month = getMonthBySlug(slug);
  if (!month) return null;
  return <MonthView month={month} />;
}
