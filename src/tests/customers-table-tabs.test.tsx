import { exampleCustomersNormalized } from "@/features/customers/exampleCustomersState";
import userEvent from "@testing-library/user-event";

import { createTSRRouter, renderWithProviders } from "@/lib/test-utils";

import {
  createBrowserHistory,
  RouterHistory,
  RouterProvider,
} from "@tanstack/react-router";

import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

let history: RouterHistory;

beforeEach(() => {
  history = createBrowserHistory();
  expect(window.location.pathname).toBe("/");
});
afterEach(() => {
  history.destroy();
  window.history.replaceState(null, "root", "/");
});

describe("Tabs", () => {
  const user = userEvent.setup();

  it("should show the `all` tab by default", async () => {
    const router = createTSRRouter("all", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    const defaultAllTab = await screen.getByRole("link", {
      name: /все/i,
    });
    expect(defaultAllTab).toBeInTheDocument();
    expect(defaultAllTab).toBeVisible();
    expect(defaultAllTab).toHaveAttribute("data-status", "active");
    expect(window.location.search).toBe("?tab=all");
  });

  it("should switch to `Filled` tab and filter customers correctly", async () => {
    const router = createTSRRouter("all", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    const filledTab = await screen.getByRole("link", {
      name: /^заполненные/i,
    });
    expect(filledTab).toBeInTheDocument();
    expect(filledTab).toBeVisible();
    expect(filledTab).not.toHaveAttribute("data-status", "active");

    await user.click(filledTab);
    expect(filledTab).toHaveAttribute("data-status", "active");

    const customers = await screen.findAllByRole("row", {
      // Exclude table header row
      name: /^(?!.*выделить всех клиентов)/i,
    });

    expect(window.location.search).toBe("?tab=filled");
    expect(customers.length).toBe(2);
  });

  it("should switch to `Blank` tab and filter customers correctly", async () => {
    const router = createTSRRouter("blank", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    expect(window.location.search).toBe("?tab=blank");

    const customers = await screen.queryAllByRole("row", {
      // Exclude table header row
      name: /^(?!.*выделить всех клиентов)/i,
    });
    expect(customers.length).toBe(0);
  });
});
