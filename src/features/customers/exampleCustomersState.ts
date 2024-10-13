import { EntityState, nanoid } from "@reduxjs/toolkit";

import type { Customer } from "@/features/customers/types";

export const exampleCustomers = [
  {
    id: nanoid(),
    name: "Иван",
    email: "ivan@gmail.com",
    phone: "89111234567",
  },
  {
    id: nanoid(),
    name: "Антон",
    email: "anton@gmail.com",
    phone: "89119876543",
  },
];

const entitiesShape: Record<Customer["id"], Customer> = {};

export const exampleCustomersNormalized: {
  customers: EntityState<Customer, Customer["id"]>;
} = {
  customers: {
    ids: [...exampleCustomers.map((c) => c.id)],
    entities: {
      ...exampleCustomers.reduce((obj, c) => {
        obj[c.id] = c;
        return obj;
      }, entitiesShape),
    },
  },
};
