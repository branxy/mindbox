import { Checkbox } from "@/components/ui/checkbox";

import { PropsWithChildren, useState } from "react";

export interface CustomersTableHeadProps {}

export function CustomersTableHead({}: CustomersTableHeadProps) {
  const [checked, setChecked] = useState<"indeterminate" | boolean>(false);
  return (
    <thead>
      <tr className="grid h-12 grid-flow-col grid-cols-customersTable items-center gap-4 border-y-[1px] border-mbDivider px-4 py-3">
        <CustomersTableCheckbox checked={checked} setChecked={setChecked} />
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
  setChecked: React.Dispatch<React.SetStateAction<boolean | "indeterminate">>;
}

const CustomersTableCheckbox = ({
  checked,
  setChecked,
}: CustomersTableCheckboxProps) => {
  return (
    <th>
      <label htmlFor="select-customers" className="relative">
        <Checkbox
          id="select-customers"
          checked={checked}
          onCheckedChange={setChecked}
          className=""
        />
      </label>
    </th>
  );
};

const CustomersTableColumnHead = ({ children }: PropsWithChildren) => (
  <th className="text-left text-xs font-normal">{children}</th>
);
