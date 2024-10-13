import { CustomersTable } from "@/features/customers/customers-table";
import { CustomersHeaderActionBtns } from "@/components/customers/customers-header-action-btns";
import { CustomersTableActions } from "@/features/customers/customers-table-action-panel";

import { useAppSelector } from "@/app/hooks";
import { useSelectCustomers } from "@/app/hooks";
import { selectAllCustomers } from "@/features/customers/customersSlice";

export function Customers() {
  const customers = useAppSelector((state) =>
    selectAllCustomers(state.customers),
  );

  const {
    selectedCustomerIds,
    setSelectedCustomerIds,
    isCheckedCheckbox,
    handleSelectCustomer,
    handleSelectAllCustomers,
    handleUpdateLastSelectedCustomerRef,
  } = useSelectCustomers(customers);

  return (
    <div className="w-full overflow-y-auto px-6">
      <CustomersHeader />
      <div className="pb-20">
        <CustomersTableActions
          selectedCustomerIds={selectedCustomerIds}
          setSelectedCustomerIds={setSelectedCustomerIds}
        />
        <CustomersTable
          customers={customers}
          selectedCustomerIds={selectedCustomerIds}
          handleSelectCustomer={handleSelectCustomer}
          isCheckedCheckbox={isCheckedCheckbox}
          handleSelectAllCustomers={handleSelectAllCustomers}
          handleUpdateLastSelectedCustomerRef={
            handleUpdateLastSelectedCustomerRef
          }
        />
      </div>
    </div>
  );
}

const CustomersHeader = () => (
  <div className="mb-16 flex h-[70px] justify-between py-4">
    <div className="flex items-center">
      <CustomersHeaderIcon />
      <h1 className="font-inter text-xl font-medium">Клиенты</h1>
    </div>
    <CustomersHeaderActionBtns />
  </div>
);

const CustomersHeaderIcon = () => (
  <div className="mr-4 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#028f69] text-white">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.568 2.662a3.092 3.092 0 1 0 0 6.184 3.092 3.092 0 0 0 0-6.184M5.09 4.275a2.092 2.092 0 1 1 2.959 2.959 2.092 2.092 0 0 1-2.959-2.959m1.48 5.668c-3.203 0-5.113 2.296-5.113 4.61v1.371c0 .322.072.637.214.89.133.238.395.523.798.523h8.2c.404 0 .666-.285.799-.523.142-.253.214-.568.214-.89v-1.37c0-2.315-1.91-4.611-5.113-4.611m-4.113 4.61c0-1.747 1.447-3.61 4.112-3.61 2.666 0 4.113 1.863 4.113 3.61v1.371a.856.856 0 0 1-.086.401l-.007.012h-8.04l-.006-.012a.856.856 0 0 1-.086-.401zm8.107 1.817.006-.005zm-7.99 0s-.002 0-.005-.005zm9.62-11.121a2.71 2.71 0 1 1 3.833 3.833 2.71 2.71 0 0 1-3.833-3.833m1.917.206a1.71 1.71 0 1 0 0 3.421 1.71 1.71 0 0 0 0-3.421m0 5.428c-.57 0-1.095.084-1.57.238a.5.5 0 0 0 .306.951c.372-.12.793-.189 1.264-.189 2.234 0 3.434 1.558 3.434 3.007v1.168c0 .124-.025.22-.05.28h-4.13a.5.5 0 1 0 0 1h4.243c.382 0 .626-.271.745-.484.128-.229.192-.511.192-.796V14.89c0-2.017-1.663-4.007-4.434-4.007"
        fill="currentColor"
      ></path>
    </svg>
  </div>
);
