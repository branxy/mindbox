import { Customer } from "@/features/customers/types";

export interface CustomersTableRowIdProps {
  id: Customer["id"];
}

export function CustomersTableRowId({ id }: CustomersTableRowIdProps) {
  return <td>{id.slice(0, 5)}...</td>;
}
