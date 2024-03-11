import { createLazyFileRoute } from '@tanstack/react-router'
import {UserContext} from "../../components/auth-provider.tsx";
import {useContext} from "react";

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const user = useContext(UserContext)

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  )
}