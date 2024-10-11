import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar/navbar";

// Load TSR devtools in dev mode
const TanStackRouterDevtools =
  import.meta.env.VITE_ENV === "development"
    ? React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )
    : () => null;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <Navbar />
      <main className="h-full flex-grow overflow-y-auto overflow-x-hidden pb-24 pl-6 pr-3 pt-2 lg:pb-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="top-right" />
    </div>
  );
}
