import { Provider } from "react-redux";
import { setupStore } from "@/app/store";

import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import type { AppStore, RootState } from "@/app/store";
import React, { act, PropsWithChildren } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterHistory,
} from "@tanstack/react-router";
import { Customers } from "@/components/customers/customers";
import { CustomersSearchParams } from "@/routes";
import { Tabs } from "@/features/customers/types";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  let result;
  act(() => {
    const Wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    result = {
      store,
      ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
  });

  return result;
};

export const createTSRRouter = (tab: Tabs, history?: RouterHistory) => {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <Customers />,
    validateSearch: (): CustomersSearchParams => {
      return {
        tab: tab,
      };
    },
  });

  const routeTree = rootRoute.addChildren([indexRoute]);
  const router = createRouter({ routeTree, history });
  return router;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
