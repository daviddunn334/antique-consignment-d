import { createLazyFileRoute } from "@tanstack/react-router";
import ProductForm from "../../components/productForm.tsx";
import Item from "../../lib/models/item.ts";
import { User, UserContext } from "../../components/auth-provider.tsx";
import { useContext, useState } from "react";
import ItemsGrid from "../../components/items-grid.tsx";
import SalesChart from "../../components/sales-chart.tsx";
import {
  useAddItemMutation,
  useEditItemMutation,
  useMyItems,
} from "./-dashboardHooks.ts";
import PersonalStats from "../../components/personal-stats.tsx";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

type Filter = {
  name: string;
  filter: (item: Item) => boolean;
};
const filters: Filter[] = [
  { name: "Active", filter: (item: Item) => item.soldAt == null },
  { name: "Sold", filter: (item: Item) => item.soldAt != null },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const user: User | undefined = useContext(UserContext);
  if (!user) throw new Error("User not found");

  const myItemsQuery = useMyItems(user);

  const addItemMutation = useAddItemMutation();
  const editItemMutation = useEditItemMutation();

  const [itemToEdit, setItemToEdit] = useState<Item | undefined>(undefined);
  const [currentFilter, setCurrentFilter] = useState<Filter>(filters[0]);

  function toggleSold(e: any, item: Item) {
    e.stopPropagation();
    editItemMutation.mutate({
      ...item,
      soldAt: item.soldAt ? null : new Date(),
      userId: user?.id,
    });
  }

  function showEditItemModal(item: Item) {
    setItemToEdit(item);
    // @ts-ignore
    document.getElementById("editItemModal")?.showModal();
  }
  function showAddItemModal() {
    // @ts-ignore
    document.getElementById("addItemModal")?.showModal();
  }

  // @ts-ignore
  return (
    <div className="mt-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col">
      {/*Stat Section*/}
      <PersonalStats items={myItemsQuery.data || []}></PersonalStats>

      {/*Items section header*/}
      <div className="relative border-b border-base-content pb-5 sm:pb-0">
        <div className="md:flex md:items-center md:justify-between">
          <h3 className="font-semibold leading-6 text-base-content">
            My Items
          </h3>
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/80"
              onClick={showAddItemModal}
            >
              Add Item
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-filter" className="sr-only">
              Select a filter
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent"
              defaultValue={currentFilter.name}
              onChange={(e) =>
                setCurrentFilter(
                  filters.find((f) => f.name === e.target.value) || filters[0],
                )
              }
            >
              {filters.map((filter) => (
                <option key={filter.name} value={filter.name}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {filters.map((filter) => (
                <button
                  key={filter.name}
                  className={classNames(
                    filter === currentFilter
                      ? "border-accent text-accent"
                      : "border-transparent text-base-content hover:border-base-content/80 hover:text-base-content/90",
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium",
                  )}
                  aria-current={filter === currentFilter ? "page" : undefined}
                  onClick={() => setCurrentFilter(filter)}
                >
                  {filter.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/*Items section grid*/}
      {filters.map((filter) => (
        <ItemsGrid
          className={currentFilter.name === filter.name ? "" : "hidden"}
          myItems={myItemsQuery.data}
          filter={filter.filter}
          showEditItemModal={showEditItemModal}
          toggleSold={toggleSold}
          key={filter.name}
        ></ItemsGrid>
      ))}

      <h2 className="text-3xl font-bold leading-loose tracking-tight mt-4">
        Sales and profit
      </h2>
      <div className="card bg-base-200 shadow-xl w-full h-[30rem] p-4">
        <SalesChart
          items={myItemsQuery.data?.filter((i) => i.soldAt) || []}
        ></SalesChart>
      </div>

      <dialog id="addItemModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"></button>
          </form>
          <ProductForm
            handleData={(data) =>
              addItemMutation.mutate({ ...data, userId: user.id })
            }
          ></ProductForm>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="editItemModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <ProductForm
            item={itemToEdit}
            handleData={(data) =>
              editItemMutation.mutate({
                ...data,
                soldAt: itemToEdit?.soldAt,
                userId: user.id,
              })
            }
          ></ProductForm>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
