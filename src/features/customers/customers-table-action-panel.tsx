import { CustomersTableTabs } from "@/features/customers/customers-table-tabs";
import { CustomersTableAddCustomerForm } from "@/features/customers/customers-table-add-customer-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import { Icon } from "@/components/icon";

import { customersDeleted } from "@/features/customers/customersSlice";

import { TSelectedCustomers, useAppDispatch } from "@/app/hooks";

import { useState } from "react";

interface CustomersTableActionsProps {
  selectedCustomerIds: TSelectedCustomers;
  setSelectedCustomerIds: React.Dispatch<
    React.SetStateAction<TSelectedCustomers>
  >;
}

export function CustomersTableActions({
  selectedCustomerIds,
  setSelectedCustomerIds,
}: CustomersTableActionsProps) {
  const dispatch = useAppDispatch();
  const hasSelectedCustomers = selectedCustomerIds.length > 0;

  const handleDeleteSelectedCustomers = () => {
    dispatch(customersDeleted(selectedCustomerIds));
    setSelectedCustomerIds([]);
  };

  return (
    <div className="flex h-auto justify-between">
      <CustomersTableTabs />
      <div className="flex gap-4">
        <Button
          variant="destructive"
          aria-label="Удалить клиента(-ов)"
          onClick={handleDeleteSelectedCustomers}
          disabled={!hasSelectedCustomers}
          className="disabled:cursor-not-allowed"
        >
          <Trash size={24} strokeWidth={1.5} />
        </Button>
        <CustomersTableAddCustomerBtn />
      </div>
    </div>
  );
}

const CustomersTableAddCustomerBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="mbPrimary" className="bg-[#028F69]">
          <Icon icon={Plus} color="white" />
          Добавить клиента
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Новый клиент</DialogTitle>
        </DialogHeader>
        <CustomersTableAddCustomerForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
