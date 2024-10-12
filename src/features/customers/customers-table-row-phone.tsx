import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";

import { useEditTableField } from "@/app/hooks";
import { cn } from "@/lib/utils";

import { Customer } from "@/features/customers/types";

export interface CustomersTableRowPhoneProps {
  customerId: Customer["id"];
  phone: Customer["phone"];
}

export function CustomersTableRowPhone({
  customerId,
  phone,
}: CustomersTableRowPhoneProps) {
  const { isEditing, setIsEditing, formError, handleFormSubmit } =
    useEditTableField();

  if (isEditing) {
    return (
      <td>
        <form
          onSubmit={(e) =>
            handleFormSubmit({
              e,
              customerId,
              customerFieldName: "phone",
            })
          }
          onBlur={(e) =>
            handleFormSubmit({ e, customerId, customerFieldName: "phone" })
          }
        >
          <Label htmlFor="customer-table-phone" className="sr-only">
            Редактировать телефон клиента
          </Label>
          <Input
            type="tel"
            name="customer-table-phone"
            id="customer-table-phone"
            defaultValue={phone}
            className="h-7"
            autoFocus
          />
          {!!formError && <FormError errors={formError} />}
        </form>
      </td>
    );
  } else
    return (
      <td className="cursor-edit">
        <span
          className={cn(
            "cursor-edit flex h-full max-w-fit pr-4",
            !phone && "text-gray-400",
          )}
          onClick={() => setIsEditing(true)}
        >
          {phone || "—"}
        </span>
      </td>
    );
}
