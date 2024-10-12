import { Link } from "@tanstack/react-router";

import { Tabs } from "@/features/customers/types";
import { PropsWithChildren } from "react";

export function CustomersTableTabs() {
  return (
    <div className="flex">
      <Tab tab="all">Все</Tab>
      <Tab tab="filled">Заполненные</Tab>
      <Tab tab="blank">Незаполненные</Tab>
    </div>
  );
}

interface TabProps {
  tab: Tabs;
}

const Tab = ({ tab, children }: PropsWithChildren<TabProps>) => (
  <Link
    to="/"
    search={{ tab: tab }}
    activeProps={{
      className: "border-t-0 bg-mbDivider",
    }}
    activeOptions={{ exact: true, includeSearch: true }}
    className="rounded-t-md border-2 border-transparent px-4 pb-1.5 pt-2 hover:border-b-0 hover:border-slate-200 data-[status=active]:border-0"
  >
    {children}
  </Link>
);
