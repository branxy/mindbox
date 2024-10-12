import { CustomersTableRow } from "@/features/customers/customers-table-row";

import { getRouteApi } from "@tanstack/react-router";
import { useAppSelector } from "@/app/hooks";
import { selectAllCustomers } from "@/features/customers/customersSlice";
import { filterCustomers } from "@/lib/utils";

import { useMemo } from "react";

const { useSearch } = getRouteApi("/");

export function CustomersTableBody() {
  const customers = useAppSelector(selectAllCustomers);
  const { tab } = useSearch();

  const filteredCustomers = useMemo(
    () => filterCustomers(customers, tab),
    [customers, tab],
  );

  return (
    <tbody>
      {filteredCustomers.map((c) => (
        <CustomersTableRow key={c.id} customer={c} />
      ))}
    </tbody>
  );
}
