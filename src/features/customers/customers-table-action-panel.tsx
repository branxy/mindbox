import { CustomersTableTabs } from "@/features/customers/customers-table-tabs";
import { CustomersTableAddCustomerForm } from "@/features/customers/customers-table-add-customer-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  isInfiniteScroll: boolean;
  setIsInfiniteScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomersTableActions({
  selectedCustomerIds,
  setSelectedCustomerIds,
  isInfiniteScroll,
  setIsInfiniteScroll,
}: CustomersTableActionsProps) {
  const dispatch = useAppDispatch();
  const hasSelectedCustomers = selectedCustomerIds.length > 0;

  const handleDeleteSelectedCustomers = () => {
    dispatch(customersDeleted(selectedCustomerIds));
    setSelectedCustomerIds([]);
  };

  return (
    <div className="flex h-auto justify-between">
      <div className="flex h-auto items-center gap-6">
        <CustomersTableTabs />
        <div className="flex gap-2 px-4 pb-1.5 pt-2">
          <Checkbox
            id="set-infinite-scroll"
            checked={isInfiniteScroll}
            onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}
          />
          <Label htmlFor="set-infinite-scroll">Бесконечный скролл</Label>
        </div>
      </div>
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
