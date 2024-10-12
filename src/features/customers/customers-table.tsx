import { CustomersTableHead } from "@/features/customers/customers-table-head";
import { CustomersTableBody } from "@/features/customers/customers-table-body";

import { useAppSelector } from "@/app/hooks";
import { selectAllCustomers } from "@/features/customers/customersSlice";

export function CustomersTable() {
  const customers = useAppSelector(selectAllCustomers);

  return (
    <table className="w-full">
      <CustomersTableHead />
      <CustomersTableBody customers={customers} />
    </table>
  );
}
