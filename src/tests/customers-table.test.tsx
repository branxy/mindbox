import {
  exampleCustomers,
  exampleCustomersNormalized,
} from "@/features/customers/exampleCustomersState";
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

describe("Customers table create/update/delete operations", () => {
  const user = userEvent.setup();

  const findByRole = async (
    role: Parameters<typeof screen.findByRole>["0"],
    options?: Parameters<typeof screen.findByRole>["1"],
  ) => {
    const element = await screen.findByRole(role, options);
    expect(element).toBeInTheDocument();
    return element;
  };

  it("create a new customer", async () => {
    const router = createTSRRouter("all", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    const addCustomer = async () => {
      const addCustomerButton = await findByRole("button", {
        name: /добавить клиента/i,
      });

      await user.click(addCustomerButton);
      const newCustomerDialog = await screen.findByRole("dialog", {
        name: /новый клиент/i,
      });
      expect(newCustomerDialog).toBeVisible();

      const userNameInput = await screen.findByRole("textbox", {
        name: /имя/i,
      });
      expect(userNameInput).toBeVisible();
      expect(userNameInput).toHaveFocus();
      expect(userNameInput).toHaveValue("");

      const userPhoneInput = await screen.findByRole("textbox", {
        name: /телефон/i,
      });
      expect(userPhoneInput).toBeVisible();
      expect(userPhoneInput).toHaveValue("");

      const userEmailInput = await screen.findByRole("textbox", {
        name: /почта/i,
      });
      expect(userEmailInput).toBeVisible();
      expect(userEmailInput).toHaveValue("");

      await user.type(userNameInput, "Test name", { skipClick: true });
      expect(userNameInput).toHaveValue("Test name");
      await user.type(userPhoneInput, "89111234567");
      expect(userPhoneInput).toHaveValue("89111234567");
      await user.type(userEmailInput, "test@mail.com");
      expect(userEmailInput).toHaveValue("test@mail.com");

      // Submit and close dialog
      await user.keyboard("{Enter}");
      expect(newCustomerDialog).not.toBeVisible();
    };

    await addCustomer();
    // Find new customer in the table
    await findByRole("row", {
      name: /test name 89111234567 test@mail\.com/i,
    });
  });

  it("edit default customer", async () => {
    const editName = async () => {
      const customerName = await screen.getByText(/иван/i);
      expect(customerName).toBeVisible();

      await user.click(customerName);
      expect(customerName).not.toBeVisible();
      const customerNameInput = await screen.getByTestId(
        exampleCustomers[0].id + "-tableTitleInput",
      );
      expect(customerNameInput).toBeVisible();
      await user.type(customerNameInput, " тест");
      expect(customerNameInput).toHaveValue("Иван тест");
      await user.keyboard("{Enter}");
      expect(customerNameInput).not.toBeVisible();
      expect(await screen.getByText(/иван тест/i)).toBeVisible();
    };

    const editPhone = async () => {
      const customerPhone = await screen.getByText(/89111234567/i);
      expect(customerPhone).toBeVisible();

      await user.click(customerPhone);
      expect(customerPhone).not.toBeVisible();
      const customerPhoneInput = await screen.getByTestId(
        exampleCustomers[0].id + "-tablePhoneInput",
      );
      expect(customerPhoneInput).toBeVisible();
      await user.keyboard("{Backspace}");
      expect(customerPhoneInput).toHaveValue("8911123456");
      await user.type(customerPhoneInput, "0");
      expect(customerPhoneInput).toHaveValue("89111234560");
      await user.keyboard("{Enter}");
      expect(customerPhoneInput).not.toBeVisible();
      expect(await screen.getByText(/89111234560/i)).toBeVisible();
    };

    const editEmail = async () => {
      const customerEmail = await screen.getByText(/ivan@gmail.com/i);
      expect(customerEmail).toBeVisible();

      await user.click(customerEmail);
      expect(customerEmail).not.toBeVisible();
      const customerEmailInput = await screen.getByTestId(
        exampleCustomers[0].id + "-tableEmailInput",
      );
      expect(customerEmailInput).toBeVisible();
      expect(customerEmailInput).toHaveFocus();
      expect(customerEmailInput).toHaveValue("ivan@gmail.com");
      await user.clear(customerEmailInput);
      expect(customerEmailInput).toHaveValue("");
      await user.type(customerEmailInput, "test@mail.com");
      expect(customerEmailInput).toHaveValue("test@mail.com");
      await user.keyboard("{Enter}");
      expect(customerEmailInput).not.toBeVisible();
      expect(await screen.getByText(/test@mail.com/i)).toBeVisible();
    };

    const router = createTSRRouter("all", history);
    await act(async () =>
      // @ts-expect-error The error on the router prop, as I understand it, comes from mismatch in types between this test router and the app router defined in routeTree.gen.ts. I didn't try to fix it because it doesn't affect the tests' behavior or performance.
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: exampleCustomersNormalized,
      }),
    );

    await findByRole("table");

    await editName();
    await editPhone();
    await editEmail();
  });
});
