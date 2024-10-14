import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";

import { useEditTableField } from "@/app/hooks";

import { Customer } from "@/features/customers/types";

export interface CustomersTableRowEmailProps {
  customerId: Customer["id"];
  email: Customer["email"];
}

export function CustomersTableRowEmail({
  customerId,
  email,
}: CustomersTableRowEmailProps) {
  const { isEditing, setIsEditing, formError, handleFormSubmit } =
    useEditTableField();

  if (isEditing) {
    return (
      <td>
        <form
          onSubmit={(e) =>
            handleFormSubmit({ e, customerId, customerFieldName: "email" })
          }
          onBlur={(e) =>
            handleFormSubmit({ e, customerId, customerFieldName: "email" })
          }
        >
          <Label htmlFor="customer-table-email" className="sr-only">
            Редактировать электронную почту клиента
          </Label>
          <Input
            data-testid={customerId + "-tableEmailInput"}
            type="email"
            name="customer-table-email"
            id="customer-table-email"
            defaultValue={email}
            className="h-7"
            autoFocus
          />
          {!!formError && <FormError errors={formError} />}
        </form>
      </td>
    );
  } else
    return (
      <td className="max-w-full cursor-edit truncate">
        <span className="flex h-full pr-4" onClick={() => setIsEditing(true)}>
          {email}
        </span>
      </td>
    );
}
