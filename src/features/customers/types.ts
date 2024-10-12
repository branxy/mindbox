import { nanoid } from "@reduxjs/toolkit";

export interface Customer {
  id: ReturnType<typeof nanoid>;
  name: string;
  phone?: string;
  email?: string;
}

export type Customers = Customer[];

export type EditableCustomerFields = Pick<Customer, "name" | "phone" | "email">;
