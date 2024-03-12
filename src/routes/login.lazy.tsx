import { createLazyFileRoute } from '@tanstack/react-router'
import {Auth} from "@supabase/auth-ui-react";
import {supabase} from "../lib/supabase";
import {ThemeSupa} from "@supabase/auth-ui-shared";

export const Route = createLazyFileRoute('/login')({
    component: Login,
})

function Login() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://i.imgur.com/RHsPcXa.png"
                        alt="Eden"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <Auth
                            supabaseClient={supabase}
                            providers={['google']}
                            theme="default"
                            redirectTo={import.meta.env.VITE_BASE_URL + "dashboard"}
                            socialLayout="horizontal"
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: '#91a8c3',
                                            brandAccent: '#677a9b',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
