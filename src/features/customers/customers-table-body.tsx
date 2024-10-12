import { CustomersTableRow } from "@/features/customers/customers-table-row";

import { Customers } from "@/features/customers/types";

export interface CustomersTableBodyProps {
  customers: Customers;
}

export function CustomersTableBody({ customers }: CustomersTableBodyProps) {
  return (
    <tbody>
      {customers.map((c) => (
        <CustomersTableRow key={c.id} customer={c} />
      ))}
    </tbody>
  );
}
