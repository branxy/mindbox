import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { customerAdded } from "@/features/customers/customersSlice";
import { useAppDispatch, zCustomer } from "@/app/hooks";

import { EditableCustomerFields } from "@/features/customers/types";

import { useState } from "react";

export interface CustomersTableAddCustomerFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type TFormError = Partial<Record<keyof EditableCustomerFields, string[]>>;

export function CustomersTableAddCustomerForm({
  setOpen,
}: CustomersTableAddCustomerFormProps) {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget),
      name = formData.get("add-customer-name"),
      phone = formData.get("add-customer-phone"),
      email = formData.get("add-customer-email");

    const { success, error, data } = zCustomer.safeParse({
      name,
      phone,
      email,
    });

    if (!success) {
      const zodError = error.flatten().fieldErrors;
      setFormError(zodError);
    } else {
      setFormError(null);
      dispatch(customerAdded(data));
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <Label htmlFor="add-customer-name">Имя</Label>
        <Input
          type="text"
          name="add-customer-name"
          id="add-customer-name"
          maxLength={80}
          autoFocus
          className="mt-1"
        />
        {!!formError?.name?.length && <FormError errors={formError.name} />}
      </fieldset>
      <fieldset className="mt-3">
        <Label htmlFor="add-customer-phone">Телефон</Label>
        <Input
          type="tel"
          name="add-customer-phone"
          id="add-customer-phone"
          className="mt-1"
        />
        {!!formError?.phone?.length && <FormError errors={formError.phone} />}
      </fieldset>
      <fieldset className="mt-3">
        <Label htmlFor="add-customer-email">Почта</Label>
        <Input
          type="email"
          name="add-customer-email"
          id="add-customer-email"
          className="mt-1"
        />
        {!!formError?.email?.length && <FormError errors={formError.email} />}
      </fieldset>
      <Button type="submit" variant="mbPrimary" className="mt-6">
        Добавить клиента
      </Button>
    </form>
  );
}
