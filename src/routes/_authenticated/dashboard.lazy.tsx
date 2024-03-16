import { createLazyFileRoute } from '@tanstack/react-router'
import Item from "../../lib/models/item.ts";
import {BanknotesIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
// import {User, UserContext} from "../../components/auth-provider.tsx";
// import {useContext} from "react";

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

const filters = [
    { name: 'Active', href: '#', current: true },
    { name: 'Sold', href: '#', current: false },
]

const items: Item[] = [
    {
        id: "id",
        name: "name",
        price: 0,
        description: "This is my super super super cool item!",
        imageUrl: "https://www.franciscosegarra.com/wp-content/uploads/2019/11/antique-decorative-items-francisco-segarra.jpg",
        consignerCost: 0,
        sold: false,
        boothId: '',
        categories: []
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Dashboard() {

  // const user: User | undefined = useContext(UserContext)

    return (
            <div className="mt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/*Items section header*/}
                <div className="relative border-b border-neutral pb-5 sm:pb-0">
                    <div className="md:flex md:items-center md:justify-between">
                        <h3 className="font-semibold leading-6 text-primary">My Items</h3>
                        <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80"
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
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary"
                                defaultValue={filters.find((filter) => filter?.current)?.name}
                            >
                                {filters.map((filter) => (
                                    <option key={filter.name}>{filter.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="-mb-px flex space-x-8">
                                {filters.map((filter) => (
                                    <a
                                        key={filter.name}
                                        href={filter.href}
                                        className={classNames(
                                            filter.current
                                                ? 'border-primary text-primary'
                                                : 'border-transparent text-base-content hover:border-base-content/80 hover:text-base-content/90',
                                            'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                        )}
                                        aria-current={filter.current ? 'page' : undefined}
                                    >
                                        {filter.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/*Items section grid*/}
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                    {items.map(item => (
                            <div className="card card-compact max-w-96 bg-base-200 shadow-xl">
                                <figure><img src={item.imageUrl}  alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title w-full flex space-between">
                                        {item.name}
                                    </h2>
                                    <div className="flex justify-between">
                                        <div className="badge badge-outline">Booth 1</div>
                                        <div className="flex gap-2 justify-end">
                                            <PencilSquareIcon className="h-8 w-8 hover:text-accent hover:scale-[1.15]" />
                                            <BanknotesIcon className="h-8 w-8 hover:text-green-600 hover:scale-[1.15]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
                </ul>
            </div>
    )
}


