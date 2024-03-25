// See https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes

import { createFileRoute, Outlet } from "@tanstack/react-router";
import LoginPage from "./login.tsx";
import DashboardShell from "../components/dashboard-shell.tsx";

let isLoggedIn: boolean = false;
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      isLoggedIn = true;
    }
  },
  component: () => {
    if (isLoggedIn) {
      return (
        <>
          <DashboardShell>
            <Outlet />
          </DashboardShell>
        </>
      );
    }
    return <LoginPage />;
    // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}></Auth>
  },
});
