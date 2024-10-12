import { CustomersTableRowCheckbox } from "@/features/customers/customers-table-row-checkbox";
import { CustomersTableRowTitle } from "@/features/customers/customers-table-row-title";
import { CustomersTableRowPhone } from "@/features/customers/customers-table-row-phone";
import { CustomersTableRowEmail } from "@/features/customers/customers-table-row-email";
import { CustomersTableRowId } from "@/features/customers/customers-table-row-id";

import type { Customer } from "@/features/customers/types";
import { type CustomersTableProps } from "@/features/customers/customers-table";

import { useRef } from "react";

export interface CustomersTableRowProps {
  customer: Customer;
  selectedCustomerIds: CustomersTableProps["selectedCustomerIds"];
  handleSelectCustomer: CustomersTableProps["handleSelectCustomer"];
  handleUpdateLastSelectedCustomerRef: CustomersTableProps["handleUpdateLastSelectedCustomerRef"];
}

export function CustomersTableRow({
  customer,
  selectedCustomerIds,
  handleSelectCustomer,
  handleUpdateLastSelectedCustomerRef,
}: CustomersTableRowProps) {
  const rowRef = useRef<HTMLTableRowElement>(null!);
  const isSelectedRow = selectedCustomerIds.includes(customer.id);

  return (
    <tr
      onClick={() => handleUpdateLastSelectedCustomerRef(rowRef)}
      className="grid h-14 grid-flow-col grid-cols-customersTable gap-4 border-b-[1px] border-mbDivider px-4 py-3"
    >
      <CustomersTableRowCheckbox
        customerId={customer.id}
        isSelectedRow={isSelectedRow}
        handleSelectCustomer={handleSelectCustomer}
      />
      <CustomersTableRowTitle customerId={customer.id} name={customer.name} />
      <CustomersTableRowPhone customerId={customer.id} phone={customer.phone} />
      <CustomersTableRowEmail customerId={customer.id} email={customer.email} />
      <CustomersTableRowId id={customer.id} />
    </tr>
  );
}
