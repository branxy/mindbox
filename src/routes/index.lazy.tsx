import { Customers } from "@/components/customers/customers";
import { SubNav } from "@/components/navbar/subnav/subnav";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-full">
      <SubNav />
      <Customers />
    </div>
  );
}
