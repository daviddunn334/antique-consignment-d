import { AnimatePresence, motion } from "framer-motion";
import { BanknotesIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Item from "../lib/models/item.ts";

export default function ItemsGrid({
  className,
  myItems,
  filter,
  showEditItemModal,
  toggleSold,
}: {
  className: string;
  myItems?: Item[];
  filter: (item: Item) => boolean;
  showEditItemModal: (item: Item) => void;
  toggleSold: (e: any, item: Item) => void;
}) {
  return (
    <ul
      className={
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4 " + className
      }
    >
      <AnimatePresence>
        {myItems?.filter(filter).map((item) => (
          <motion.div
            className="relative transform-style-3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ rotateY: 270 }}
            transition={{ duration: 0.5 }}
            key={item.id}
          >
            <div
              onClick={() => showEditItemModal(item)}
              className="card backface-hidden card-compact max-w-96 bg-base-200 shadow-xl hover:translate-y-2 hover:-rotate-1 hover:scale-105 hover:shadow-2xl"
              key={item.id}
            >
              <figure className="h-60">
                <img
                  className="object-cover h-full w-full"
                  src={item.imageUrl}
                  alt=""
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title w-full flex space-between">
                  {item.name}
                </h2>
                <div className="flex justify-between">
                  <div className="badge badge-outline">Booth 1</div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={(e) => toggleSold(e, item)}>
                      {!item.soldAt && (
                        <BanknotesIcon className="h-8 w-8 hover:text-green-600 hover:scale-[1.15]" />
                      )}
                      {item.soldAt && (
                        <BanknotesIcon className="h-8 w-8 hover:text-red-600 hover:scale-[1.15]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`card flex justify-center items-center absolute inset-0 -rotate-y-180 backface-hidden ${item.soldAt ? "bg-red-600" : "bg-green-600"}`}
            >
              <CurrencyDollarIcon className="h-24 w-24 text-white" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
}
