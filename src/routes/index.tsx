import { SubNav } from "@/components/navbar/subnav/subnav";
import { Customers } from "@/components/customers/customers";

import { createFileRoute } from "@tanstack/react-router";

import { Tabs } from "@/features/customers/types";

export interface CustomersSearchParams {
  tab: Tabs;
}

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search): CustomersSearchParams => {
    return {
      tab: (search?.tab as CustomersSearchParams["tab"]) || "all",
    };
  },
});

function Index() {
  return (
    <div className="flex h-full overflow-y-hidden">
      <SubNav />
      <Customers />
    </div>
  );
}
