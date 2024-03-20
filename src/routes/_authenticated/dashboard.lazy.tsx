import { createLazyFileRoute } from '@tanstack/react-router'
import {BanknotesIcon} from "@heroicons/react/24/solid";
import ProductForm, {ProductFormData} from "../../components/productForm.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../lib/supabase.ts";
import Item, {getDefaultImage} from "../../lib/models/item.ts";
import {User, UserContext} from "../../components/auth-provider.tsx";
import {useContext, useState} from "react";

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

const filters = [
    { name: 'Active', href: '#', current: true },
    { name: 'Sold', href: '#', current: false },
]

const useMyItems = (user: User) => useQuery({
    queryKey: ['myItems'],
    queryFn: async () => {
        const data = (await supabase.from('inventory_item').select('*').eq('consigner_id', user.id).throwOnError()).data
        data?.forEach((item) => item.imageUrl = item.imageUrl || getDefaultImage())
        return data
    },
    select: (data): Item[] => data?.map(supaItem => {
        if (!supaItem.imageUrl) throw new Error('No default image set');
            return {
                id: supaItem.id,
                name: supaItem.name,
                price: supaItem.price,
                consignerCost: supaItem.cost,
                description: supaItem.description,
                imageUrl: supaItem.imageUrl,
                sold: supaItem.sold,
                boothId: supaItem.booth_id || "",
                categories: [],
            }})
        || []
})

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Dashboard() {
    const user: User | undefined = useContext(UserContext)
    if (!user) throw new Error('User not found')

    const queryClient = useQueryClient()
    const myItemsQuery = useMyItems(user)

    const addItemMutation = useMutation({
        mutationFn: async (data: ProductFormData & { user: User }) =>
            await supabase.from('inventory_item').insert([
                {
                    name: data.name,
                    price: data.price,
                    cost: data.consignerCost,
                    description: data.description,
                    consigner_id: data.user.id,
                }
            ]).select().single().throwOnError(),
        onSuccess: (response) => {
            queryClient.setQueryData(['myItems'], (oldData: any[]) => {
                if (!response.data) throw new Error('No data returned from addItemMutation')
                response.data.imageUrl ??= getDefaultImage()
                return oldData ? [...oldData, response.data] : [response.data]
            });
            (document.getElementById('addItemModal') as HTMLDialogElement).close()
        },
        onError: (error) => {
            console.error(error)
        }
    })
    const editItemMutation= useMutation({
        mutationFn: async (data: ProductFormData & { user: User }) => {
            if (!data.id) throw new Error('Item id is required')
            return supabase.from('inventory_item').update({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    cost: data.consignerCost,
                    description: data.description,
                    consigner_id: data.user.id,
            })
            .eq('id', data.id)
            .select().single().throwOnError()
        },
        onSuccess: (response) => {
            queryClient.setQueryData(['myItems'], (oldData: any[]) => {
                if (!response.data || !oldData) throw new Error('No data returned from editItemMutation, or no data in my items query.')
                response.data.imageUrl ??= getDefaultImage()
                const indexOfItem = oldData.findIndex(i => i.id === response.data.id)
                return [...oldData.slice(0, indexOfItem), response.data, ...oldData.slice(indexOfItem + 1)]
            });
            (document.getElementById('editItemModal') as HTMLDialogElement).close()
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const [itemToEdit, setItemToEdit] = useState<Item | undefined>(undefined)
    function showEditItemModal(item: Item) {
        setItemToEdit(item)
        // @ts-ignore
        document.getElementById('editItemModal')?.showModal();
    }
    function showAddItemModal() {
        // @ts-ignore
        document.getElementById('addItemModal')?.showModal();
    }

    // @ts-ignore
    return (
            <div className="mt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/*Items section header*/}
                <div className="relative border-b border-base-content pb-5 sm:pb-0">
                    <div className="md:flex md:items-center md:justify-between">
                        <h3 className="font-semibold leading-6 text-primary">My Items</h3>
                        <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80"
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
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {myItemsQuery.data?.map(item => (
                            <div onClick={() => showEditItemModal(item)} className="card card-compact max-w-96 bg-base-200 shadow-xl transition-all hover:translate-y-2 hover:-rotate-1 hover:scale-105 hover:shadow-2xl" key={item.id}>
                                <figure className="h-60"><img className="object-cover h-full w-full" src={item.imageUrl} alt="" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title w-full flex space-between">
                                        {item.name}
                                    </h2>
                                    <div className="flex justify-between">
                                        <div className="badge badge-outline">Booth 1</div>
                                        <div className="flex gap-2 justify-end">
                                            <BanknotesIcon className="h-8 w-8 hover:text-green-600 hover:scale-[1.15]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
                </ul>
                <dialog id="addItemModal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <ProductForm handleData={(data) => addItemMutation.mutate({...data, user})}></ProductForm>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <dialog id="editItemModal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <ProductForm item={itemToEdit} handleData={(data) => editItemMutation.mutate({...data, user})}></ProductForm>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
    )
}


