import { Checkbox } from "@/components/ui/checkbox";

import type { Customer } from "@/features/customers/types";
import { type CustomersTableProps } from "@/features/customers/customers-table";

export interface CustomersTableRowCheckboxProps {
  customerId: Customer["id"];
  isSelectedRow: boolean;
  handleSelectCustomer: CustomersTableProps["handleSelectCustomer"];
}

export function CustomersTableRowCheckbox({
  customerId,
  isSelectedRow,
  handleSelectCustomer,
}: CustomersTableRowCheckboxProps) {
  return (
    <td>
      <Checkbox
        checked={isSelectedRow}
        onClick={() => handleSelectCustomer(customerId)}
      />
    </td>
  );
}
