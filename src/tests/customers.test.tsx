import { exampleCustomersNormalized } from "@/features/customers/exampleCustomersState";
import { createTSRRouter, renderWithProviders } from "@/lib/test-utils";

import {
  createBrowserHistory,
  RouterHistory,
  RouterProvider,
} from "@tanstack/react-router";

import { act, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { afterEach, beforeEach } from "vitest";

let history: RouterHistory;

beforeEach(() => {
  history = createBrowserHistory();
  expect(window.location.pathname).toBe("/");
});
afterEach(() => {
  history.destroy();
  window.history.replaceState(null, "root", "/");
});

describe("Customers render", () => {
  const findByRole = async (
    role: Parameters<typeof screen.findByRole>["0"],
    options?: Parameters<typeof screen.findByRole>["1"],
  ) => {
    const element = await screen.findByRole(role, options);
    expect(element).toBeInTheDocument();
  };

  it("by default with `exampleCustomers`", async () => {
    const router = createTSRRouter("all", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    await findByRole("table");
    const customers = await screen.findAllByRole("row", {
      // Exclude table header row
      name: /^(?!.*выделить всех клиентов)/i,
    });
    expect(customers.length).toBe(2);
    await findByRole("row", {
      // this is the default data from `exampleCustomers`
      name: /Иван 89111234567 ivan@gmail.com/i,
    });
    await findByRole("row", {
      // this is the default data from `exampleCustomers`
      name: /антон 89119876543 anton@gmail\.com/i,
    });
  });
});
