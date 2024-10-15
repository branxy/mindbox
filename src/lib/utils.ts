import { faker } from "@faker-js/faker";
import { current, nanoid } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { EntityState } from "@reduxjs/toolkit";
import type { Customer, Customers, Tabs } from "@/features/customers/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFromLocalStorage = <Data extends Customers | boolean>(
  key: "mb-customers" | "mb-copyright",
): Data | null => {
  const json = localStorage.getItem(key);

  if (json != null) {
    const data = JSON.parse(json);

    if (
      key === "mb-customers" &&
      typeof data === "object" &&
      "entities" in data
    ) {
      const customers = Object.values(data.entities) as Customers;
      if (Array.isArray(customers)) return customers as Data;
    } else if (key === "mb-copyright") {
      return data;
    }
  }

  return null;
};

export const saveToLocalStorage = (
  key: "mb-customers",
  state: EntityState<Customer, string>,
) => {
  localStorage.setItem(key, JSON.stringify(current(state)));
};

export const filterCustomers = (customers: Customers, tab: Tabs) => {
  switch (tab) {
    case "all":
      return customers;
    case "filled":
      return customers.filter((c) => c.name && c.phone);
    case "blank":
      return customers.filter((c) => !c.name || !c.phone);
    default:
      throw new Error("Unknown tab value at filterCustomers");
  }
};

export const generateCustomers = (amount = 40) => {
  const newCustomers: Customers = [];

  for (let i = 0; i < amount; i++) {
    const name = faker.person.firstName();
    newCustomers.push({
      id: nanoid(),
      name,
      phone: faker.phone.number({ style: "national" }),
      email: faker.internet.email({ firstName: name, provider: "mindbox.ru" }),
    });
  }

  return newCustomers;
};
