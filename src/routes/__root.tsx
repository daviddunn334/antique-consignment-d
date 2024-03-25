import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { User } from "../components/auth-provider.tsx";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export type RouteContext = {
  user?: User;
  currentPageTitle: string;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <>
      <Outlet />
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});
