import { createLazyFileRoute } from '@tanstack/react-router'
import ConsignerLanding from "../pages/consigner-landing.tsx";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <ConsignerLanding />
        </div>
    )
}