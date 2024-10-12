import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";

import { useEditTableField } from "@/app/hooks";

import { Customer } from "@/features/customers/types";

export interface CustomersTableRowTitleProps {
  customerId: Customer["id"];
  name: string;
}

export function CustomersTableRowTitle({
  customerId,
  name,
}: CustomersTableRowTitleProps) {
  const { isEditing, setIsEditing, formError, handleFormSubmit } =
    useEditTableField();

  if (isEditing) {
    return (
      <td>
        <form
          onSubmit={(e) =>
            handleFormSubmit({ e, customerId, customerFieldName: "name" })
          }
          onBlur={(e) =>
            handleFormSubmit({ e, customerId, customerFieldName: "name" })
          }
        >
          <Label htmlFor="customer-table-name" className="sr-only">
            Редактировать имя клиента
          </Label>
          <Input
            type="text"
            name="customer-table-name"
            id="customer-table-name"
            defaultValue={name}
            className="h-7"
            autoFocus
          />
          {!!formError && <FormError errors={formError} />}
        </form>
      </td>
    );
  } else {
    return (
      <td>
        <span
          className="cursor-edit flex h-full max-w-fit pr-4"
          onClick={() => setIsEditing(true)}
        >
          {name}
        </span>
      </td>
    );
  }
}
