import { CustomersTableRow } from "@/features/customers/customers-table-row";

import { getRouteApi } from "@tanstack/react-router";

import { filterCustomers } from "@/lib/utils";

import { type Customers } from "@/features/customers/types";
import { type CustomersTableProps } from "@/features/customers/customers-table";

import { useMemo } from "react";

const { useSearch } = getRouteApi("/");

interface CustomersTableBodyProps {
  customers: Customers;
  selectedCustomerIds: CustomersTableProps["selectedCustomerIds"];
  handleSelectCustomer: CustomersTableProps["handleSelectCustomer"];
  handleUpdateLastSelectedCustomerRef: CustomersTableProps["handleUpdateLastSelectedCustomerRef"];
}

export function CustomersTableBody({
  customers,
  selectedCustomerIds,
  handleSelectCustomer,
  handleUpdateLastSelectedCustomerRef,
}: CustomersTableBodyProps) {
  const { tab } = useSearch();

  const filteredCustomers = useMemo(
    () => filterCustomers(customers, tab),
    [customers, tab],
  );

  return (
    <tbody>
      {filteredCustomers.map((c) => (
        <CustomersTableRow
          key={c.id}
          customer={c}
          selectedCustomerIds={selectedCustomerIds}
          handleSelectCustomer={handleSelectCustomer}
          handleUpdateLastSelectedCustomerRef={
            handleUpdateLastSelectedCustomerRef
          }
        />
      ))}
    </tbody>
  );
}
