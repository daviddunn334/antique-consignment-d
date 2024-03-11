// See https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes

import {createFileRoute, Outlet} from "@tanstack/react-router";

let isLoggedIn: boolean = false;
export const Route = createFileRoute('/_authenticated')({
    beforeLoad:  ({ context }) => {
        if (context.user) {
            isLoggedIn = true;
        }
    },
    component: () => {
        if (isLoggedIn) {
            return <Outlet />
        }
        return <p>Not logged in</p>
        // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}></Auth>
    },
})