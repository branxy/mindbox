import { CustomersTableHead } from "@/features/customers/customers-table-head";
import { CustomersTableBody } from "@/features/customers/customers-table-body";

export function CustomersTable() {
  return (
    <table className="w-full ">
      <CustomersTableHead />
      <CustomersTableBody />
    </table>
  );
}
