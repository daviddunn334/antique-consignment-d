import {useState, useEffect, createContext} from 'react'
import {Session} from '@supabase/supabase-js'
import {App} from '../main.tsx'
import {supabase} from '../lib/supabase'

export type User = {
    id?: string
    email?: string
    role?: string
    imageUrl?: string
}

export const UserContext = createContext<User | undefined>(undefined);

export default function AuthProvider() {
    const [session, setSession] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            // @ts-ignore
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            // @ts-ignore
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const userFromSession = (session: Session | undefined): User | undefined => {
        if (!session) {
            return undefined
        }
        return {
            id: session?.user?.id,
            email: session?.user?.email,
            role: session?.user?.role,
        }
    }

    return loading ? null : ( // Don't render a no-session if it just hasn't loaded yet.
        <UserContext.Provider value={ userFromSession(session) }>
            <App />
        </UserContext.Provider>
    )
}