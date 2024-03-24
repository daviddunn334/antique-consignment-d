import React, { useContext, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import Item from "../../lib/models/item.ts";
import { ThemeContext } from "../dashboard-shell.tsx";

type CumulativeAmount = { date: Date; amount: number };

function getCumulativeProfit(items: Item[]): CumulativeAmount[] {
  // Filter to sold items
  const soldItems = items.filter((item) => item.soldAt !== null) as Item[];
  // Sort sold items by sold date
  soldItems.sort((a, b) => a.soldAt!.getTime() - b.soldAt!.getTime());
  // Calculate cumulative sales for each day
  const cumulativeSales: CumulativeAmount[] = [];
  let cumulativeAmount = 0;
  soldItems.forEach((item) => {
    cumulativeAmount += item.price - item.consignerCost;
    cumulativeSales.push({ date: item.soldAt!, amount: cumulativeAmount });
  });
  return cumulativeSales;
}

export default function ProfitChart({ items }: { items: Item[] }) {
  const theme = useContext(ThemeContext);
  const data = useMemo(
    () => [
      {
        label: "Profit",
        data: getCumulativeProfit(items),
        color: "#ffffff",
      },
    ],
    [items],
  );

  const primaryAxis = React.useMemo(
    (): AxisOptions<CumulativeAmount> => ({
      getValue: (datum) => datum.date,
      scaleType: "localTime",
    }),
    [data],
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<CumulativeAmount>[] => [
      {
        getValue: (datum) => datum.amount,
        elementType: "line",
        formatters: {
          scale: (value: string) => "$" + value,
        },
      },
    ],
    [data],
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      {items.length > 1 ? (
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            defaultColors: ["hsl(97, 21%, 70%)"],
            dark: theme === "dark",
          }}
        />
      ) : (
        <span>Sell your first two items to view sales graphs.</span>
      )}
    </div>
  );
}
