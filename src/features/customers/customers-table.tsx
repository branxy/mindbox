import { CustomersTableHead } from "@/features/customers/customers-table-head";

export interface CustomersTableProps {}

export function CustomersTable({}: CustomersTableProps) {
  return (
    <table className="w-full">
      <CustomersTableHead />
    </table>
  );
}
