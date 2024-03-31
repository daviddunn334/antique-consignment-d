import { createContext, ReactNode, useEffect, useState } from "react";
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link, useRouterState } from "@tanstack/react-router";

export const ThemeContext = createContext<string>("light");

const tabs = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Inventory",
    href: "/inventory",
    current: false,
    icon: ArchiveBoxIcon,
  },
  { name: "Add Item", href: "/add-item", icon: PlusIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
];

// function logout() {
//   supabase.auth
//     .signOut()
//     .then(
//       () => (window.location.href = import.meta.env.VITE_BASE_URL + "login"),
//     );
// }

export default function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouterState();
  const tab = tabs.find((t) => router.location.href.includes(t.href));
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light",
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div className="w-full bg-base-100 py-2">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="navbar-start items-center flex gap-2">
            <img
              className="h-8 w-auto hidden lg:block"
              src="https://i.imgur.com/RHsPcXa.png"
              alt="Seed Logo"
            />
            <a
              className="text-2xl font-heading hidden lg:inline"
              href={"/dashboard"}
            >
              Seed
            </a>
            <h1 className="text-2xl lg:hidden">{tab?.name}</h1>
          </div>
          <div className="flex-shrink-0 justify-center flex-grow hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              {tabs.map(
                (tab) =>
                  tab.name != "Profile" && (
                    <li key={tab.name}>
                      <Link
                        to={tab.href}
                        activeProps={{ className: "active" }}
                        key={tab.name}
                      >
                        {tab.name}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <div className="navbar-end flex gap-2 lg:gap-4 items-center">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller hidden"
                value="darkseed"
                defaultChecked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              />
              {/* moon icon */}
              <svg
                className="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              {/* sun icon */}
              <svg
                className="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/*<span className="badge badge-xs badge-primary indicator-item"></span>*/}
            </div>
            <Link
              to={tabs.filter((t) => t.name == "Profile")[0].href}
              activeProps={{
                className: "border-accent border-4 rounded-full",
              }}
            >
              <UserIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-full max-w-screen overflow-x-hidden">
        <main>
          <div className="py-4 lg:py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
            <ThemeContext.Provider value={theme}>
              {children}
            </ThemeContext.Provider>
          </div>
        </main>
        <div className="lg:hidden">
          {/* mobile nav */}
          <div className="h-16"></div>
          <nav className="btm-nav text-accent bg-base-200 shadow-xl shadow-base-content overflow-visible">
            {tabs.map((tab) => (
              <Link
                to={tab.href}
                activeProps={{ className: "active bg-primary/30" }}
                key={tab.name}
              >
                <tab.icon className="h-8 w-8 hover:scale-[1.05]" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
