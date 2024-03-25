import ProfitChart from "../../components/data-display/profit-chart.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { UserContext } from "../../components/auth-provider.tsx";
import { useContext } from "react";
import { useMyItems } from "../../lib/itemHooks.ts";
import SalesChart from "../../components/data-display/sales-chart.tsx";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
  beforeLoad: () => {
    return {
      currentPageTitle: "Analytics",
    };
  },
});

function AnalyticsPage() {
  const user = useContext(UserContext);
  if (!user) throw new Error("User not found");
  const myItemsQuery = useMyItems(user);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="card bg-base-200 shadow-xl w-full h-[26rem] p-4">
          <h2 className="text-xl text-center">Sales</h2>
          <ProfitChart items={myItemsQuery.data || []}></ProfitChart>
        </div>
        <div className="card bg-base-200 shadow-xl w-full h-[26rem] p-4">
          <h2 className="text-xl text-center">Profit</h2>
          <SalesChart
            items={myItemsQuery.data?.filter((i) => i.soldAt) || []}
          ></SalesChart>
        </div>
      </div>
    </>
  );
}
