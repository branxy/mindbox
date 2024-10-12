import { z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { customerChanged } from "@/features/customers/customersSlice";

import type {
  Customer,
  Customers,
  EditableCustomerFields,
} from "@/features/customers/types";
import { type AppDispatch, type RootState } from "@/app/store";

import { useCallback, useEffect, useRef, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppSelector = createSelector.withTypes<RootState>();

export const zCustomerName = z
  .string({
    message: "Title must be of text format",
  })
  .trim()
  .min(1, {
    message: "Title must contain at least 1 character",
  })
  .max(80, {
    message: "Title couldn't be longer than 80 characters",
  });

export const zCustomerPhone = z
  .string({
    message: "Phone must be of text format",
  })
  .trim()
  .length(11, {
    message: "Phone must have 11 characters",
  });

export const zCustomerEmail = z
  .string({
    message: "Email must be of text format",
  })
  .trim()
  .email({
    message: "Invalid email format",
  });

export const zCustomer = z.object({
  name: z
    .string({
      message: "Title must be of text format",
    })
    .trim()
    .max(80, {
      message: "Title couldn't be longer than 80 characters",
    })
    .optional(),
  phone: z
    .string({
      message: "Phone must be of text format",
    })
    .trim()
    .refine((val) => (!val ? true : val.length === 11), {
      message: "Phone must have 11 characters",
    })
    .optional(),
  email: zCustomerEmail,
});

export type TZodCustomer = z.infer<typeof zCustomer>;

export type TransactionTemplateFormError<T> = {
  [K in keyof T]?: string[];
};

interface HandleFormSubmitParams {
  e: React.FormEvent<HTMLFormElement>;
  customerId: Customer["id"];
  customerFieldName: keyof EditableCustomerFields;
}

interface ValidateInputParams {
  customerId: Customer["id"];
  customerFieldName: HandleFormSubmitParams["customerFieldName"];
  input: keyof Customer | FormDataEntryValue | null;
  form?: EventTarget & HTMLFormElement;
}

export const useEditTableField = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const validateInput = useCallback(
    ({ customerId, customerFieldName, input, form }: ValidateInputParams) => {
      const zodTemplates: Record<
        keyof Pick<Customer, "name" | "phone" | "email">,
        z.ZodString
      > = {
        name: zCustomerName,
        phone: zCustomerPhone,
        email: zCustomerEmail,
      };
      const {
        success,
        error,
        data: newPhone,
      } = zodTemplates[customerFieldName].safeParse(input);

      if (!success) {
        const zodError = error.format()._errors[0];
        setFormError(zodError);
      } else {
        setFormError(null);
        form?.reset();
        setIsEditing(false);

        dispatch(
          customerChanged({
            id: customerId,
            changes: {
              [customerFieldName]: newPhone,
            },
          }),
        );
      }
    },
    [dispatch],
  );

  const handleFormSubmit = useCallback(
    ({ e, customerId, customerFieldName }: HandleFormSubmitParams) => {
      if ("preventDefault" in e) e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newCustomerFieldValue = formData.get(
        `customer-table-${customerFieldName}`,
      );

      validateInput({
        customerId,
        customerFieldName,
        input: newCustomerFieldValue,
        form: e.currentTarget,
      });
    },
    [validateInput],
  );

  return {
    isEditing,
    setIsEditing,
    formError,
    handleFormSubmit,
  } as const;
};

export type TSelectedCustomers = Array<Customer["id"]>;

export const useSelectCustomers = (tableRows: Customers) => {
  const [selectedCustomerIds, setSelectedCustomerIds] =
    useState<TSelectedCustomers>([]);
  const lastSelectedCustomerRef = useRef<HTMLTableRowElement>(null!);
  const singleCustomerSelected = selectedCustomerIds.length === 1;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        singleCustomerSelected &&
        lastSelectedCustomerRef.current &&
        !lastSelectedCustomerRef.current.contains(e.target as Node)
      ) {
        setSelectedCustomerIds([]);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [singleCustomerSelected, selectedCustomerIds]);

  const isCheckedCheckbox =
    selectedCustomerIds.length === 0
      ? false
      : selectedCustomerIds.length === tableRows.length
        ? true
        : "indeterminate";

  const handleSelectCustomer = useCallback(
    (customerId: Customer["id"]) => {
      if (!selectedCustomerIds.length) {
        setSelectedCustomerIds([customerId]);
      } else if (!selectedCustomerIds.includes(customerId)) {
        setSelectedCustomerIds((prev) => [...prev, customerId]);
      } else {
        setSelectedCustomerIds((prev) =>
          prev.filter((id) => id !== customerId),
        );
      }
    },
    [selectedCustomerIds],
  );

  const handleSelectAllCustomers = useCallback(() => {
    if (selectedCustomerIds.length < tableRows.length) {
      const allCustomerIds = tableRows.map((c) => c.id);
      setSelectedCustomerIds(allCustomerIds);
    } else setSelectedCustomerIds([]);
  }, [tableRows, selectedCustomerIds]);

  const handleUpdateLastSelectedCustomerRef = (
    rowRef: React.MutableRefObject<HTMLTableRowElement>,
  ) => {
    lastSelectedCustomerRef.current = rowRef.current;
  };

  return {
    selectedCustomerIds,
    setSelectedCustomerIds,
    isCheckedCheckbox,
    handleSelectCustomer,
    handleSelectAllCustomers,
    handleUpdateLastSelectedCustomerRef,
  } as const;
};
