import { createLazyFileRoute } from '@tanstack/react-router'
import {User, UserContext} from "../../components/auth-provider.tsx";
import {useContext} from "react";

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

const tabs = [
    { name: 'Active', href: '#', current: true },
    { name: 'Sold', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Dashboard() {
  const user: User | undefined = useContext(UserContext)

    return (
        <>

            <div className="mt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="sm:flex sm:items-baseline">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Issues</h3>
                        <div className="mt-4 sm:ml-10 sm:mt-0">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <a
                                        key={tab.name}
                                        href={tab.href}
                                        className={classNames(
                                            tab.current
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                        )}
                                        aria-current={tab.current ? 'page' : undefined}
                                    >
                                        {tab.name}
                                    </a>
                                ))}
                            </nav>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


