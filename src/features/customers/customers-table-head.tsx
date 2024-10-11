import { Checkbox } from "@/components/ui/checkbox";

import { PropsWithChildren, useState } from "react";

export interface CustomersTableHeadProps {}

export function CustomersTableHead({}: CustomersTableHeadProps) {
  const [checked, setChecked] = useState<"indeterminate" | boolean>(
    "indeterminate",
  );
  return (
    <thead>
      <tr className="grid-cols-customersTable border-mbDivider grid h-12 grid-flow-col gap-4 border-y-[1px] px-4 py-3">
        <th>
          <label htmlFor="select-customers" className="relative">
            <Checkbox
              id="select-customers"
              checked={checked}
              onCheckedChange={setChecked}
              className=""
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                width="8"
                height="2"
                viewBox="0 0 8 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1h8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </label>
        </th>
        <CustomersTableColumnHead>Клиент</CustomersTableColumnHead>
        <CustomersTableColumnHead>Телефон</CustomersTableColumnHead>
        <CustomersTableColumnHead>Email</CustomersTableColumnHead>
        <CustomersTableColumnHead>ID</CustomersTableColumnHead>
      </tr>
    </thead>
  );
}

const CustomersTableColumnHead = ({ children }: PropsWithChildren) => (
  <th className="text-left text-xs font-normal">{children}</th>
);
