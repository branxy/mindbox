import { Navbar } from "@/components/navbar/navbar";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import React from "react";

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
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <main className="h-full flex-grow overflow-y-auto overflow-x-hidden antialiased">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
