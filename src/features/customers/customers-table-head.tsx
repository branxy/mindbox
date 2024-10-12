import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useSelectCustomers } from "@/app/hooks";

import { PropsWithChildren } from "react";

export interface CustomersTableHeadProps {
  isCheckedCheckbox: ReturnType<typeof useSelectCustomers>["isCheckedCheckbox"];
  handleSelectAllCustomers: ReturnType<
    typeof useSelectCustomers
  >["handleSelectAllCustomers"];
}

export function CustomersTableHead({
  isCheckedCheckbox,
  handleSelectAllCustomers,
}: CustomersTableHeadProps) {
  return (
    <thead>
      <tr className="grid h-12 grid-flow-col grid-cols-customersTable items-center gap-4 border-y-[1px] border-mbDivider px-4 py-3">
        <CustomersTableCheckbox
          checked={isCheckedCheckbox}
          handleSelectAllCustomers={handleSelectAllCustomers}
        />
        <CustomersTableColumnHead>Клиент</CustomersTableColumnHead>
        <CustomersTableColumnHead>Телефон</CustomersTableColumnHead>
        <CustomersTableColumnHead>Email</CustomersTableColumnHead>
        <CustomersTableColumnHead>ID</CustomersTableColumnHead>
      </tr>
    </thead>
  );
}

interface CustomersTableCheckboxProps {
  checked: boolean | "indeterminate";
  handleSelectAllCustomers: ReturnType<
    typeof useSelectCustomers
  >["handleSelectAllCustomers"];
}

const CustomersTableCheckbox = ({
  checked,
  handleSelectAllCustomers,
}: CustomersTableCheckboxProps) => {
  return (
    <th className="flex">
      <Label htmlFor="select-customers" className="sr-only">
        Выделить всех клиентов
      </Label>
      <Checkbox
        id="select-customers"
        checked={checked}
        onCheckedChange={handleSelectAllCustomers}
      />
    </th>
  );
};

const CustomersTableColumnHead = ({ children }: PropsWithChildren) => (
  <th className="text-left text-xs font-normal">{children}</th>
);
