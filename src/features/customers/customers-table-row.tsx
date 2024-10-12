import { CustomersTableRowCheckbox } from "@/features/customers/customers-table-row-checkbox";
import { CustomersTableRowTitle } from "@/features/customers/customers-table-row-title";
import { CustomersTableRowPhone } from "@/features/customers/customers-table-row-phone";
import { CustomersTableRowEmail } from "@/features/customers/customers-table-row-email";
import { CustomersTableRowId } from "@/features/customers/customers-table-row-id";

import { Customer } from "@/features/customers/types";

export interface CustomersTableRowProps {
  customer: Customer;
}

export function CustomersTableRow({ customer }: CustomersTableRowProps) {
  return (
    <tr className="grid h-14 grid-flow-col grid-cols-customersTable gap-4 border-b-[1px] border-mbDivider px-4 py-3">
      <CustomersTableRowCheckbox />
      <CustomersTableRowTitle customerId={customer.id} name={customer.name} />
      <CustomersTableRowPhone customerId={customer.id} phone={customer.phone} />
      <CustomersTableRowEmail customerId={customer.id} email={customer.email} />
      <CustomersTableRowId id={customer.id} />
    </tr>
  );
}
