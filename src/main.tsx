import "./styles.css";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import NotFound from "./pages/404-not-found.tsx";
import { useContext } from "react";
import AuthProvider, { UserContext } from "./components/auth-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: NotFound,
  context: {
    user: undefined,
    currentPageTitle: "Dashboard",
  },
});

const queryClient = new QueryClient();

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      <AuthProvider />
    </QueryClientProvider>,
  );
}

export function App() {
  const user = useContext(UserContext);
  return <RouterProvider router={router} context={{ user: user }} />;
}
