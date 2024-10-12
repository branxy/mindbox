import { CustomersTableTabs } from "./customers-table-tabs";
import { CustomersTableAddCustomerForm } from "./customers-table-add-customer-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Icon } from "@/components/icon";

import { useState } from "react";

export function CustomersTableActionPanel() {
  return (
    <div className="flex h-auto justify-between">
      <CustomersTableTabs />
      <CustomersTableAddCustomerBtn />
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
