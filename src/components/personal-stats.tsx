import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import Item from "../lib/models/item.ts";

function calculateProfit(items: Item[]): string {
  const profitNumber = items.reduce((profit, i) => {
    let newProfit = profit - i.consignerCost;
    if (!!i.soldAt) newProfit += i.price;
    return newProfit;
  }, 0);
  if (profitNumber < 0) return `-$${Math.abs(profitNumber)}`;
  else return `$${profitNumber}`;
}

export default function PersonalStats({ items }: { items: Item[] }) {
  const profit = calculateProfit(items);

  return (
    <div className="stats stats-vertical md:stats-horizontal shadow-xl mb-8">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <ClipboardDocumentListIcon className="h-10 w-10" />
        </div>
        <div className="stat-title">Items Procured</div>
        <div className="stat-value">{items.length || 0}</div>
        <div className="stat-desc">How many items you've gotten!</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <CurrencyDollarIcon className="h-10 w-10" />
        </div>
        <div className="stat-title">Active Listing Worth</div>
        <div className="stat-value">
          $
          {items
            .filter((i) => !i.soldAt)
            .reduce((prices, i) => prices + i.price, 0) || 0}
        </div>
        <div className="stat-desc">You'll get this if everything sells.</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <BanknotesIcon className="h-10 w-10" />
        </div>
        <div className="stat-title">Profit</div>
        <div
          className={`stat-value ${profit.includes("-") ? "text-red-400" : "text-green-600"}`}
        >
          {profit}
        </div>
        <div className="stat-desc">Total income minus total spent.</div>
      </div>
    </div>
  );
}
