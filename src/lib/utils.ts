import { current } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { EntityState } from "@reduxjs/toolkit";
import type { Customer, Customers, Tabs } from "@/features/customers/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFromLocalStorage = (key: "mb-customers"): Customers | null => {
  const json = localStorage.getItem(key);

  if (json != null) {
    const data = JSON.parse(json);

    if ("entities" in data) {
      return Object.values(data.entities);
    } else throw new Error("Invalid data format from localStorage");
  } else return null;
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
