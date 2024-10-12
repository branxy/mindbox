import {
  createEntityAdapter,
  createSlice,
  nanoid,
  Update,
} from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";

import type { Customer } from "@/features/customers/types";
import { type TSelectedCustomers } from "@/app/hooks";

const customersAdapter = createEntityAdapter<Customer>();

const dataFromLocalStorage = getFromLocalStorage("mb-customers") ?? [
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

const initialState = customersAdapter.getInitialState({}, dataFromLocalStorage);

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: (create) => ({
    customerAdded: create.reducer<Omit<Customer, "id">>((state, action) => {
      customersAdapter.addOne(state, { ...action.payload, id: nanoid() });
      saveToLocalStorage("mb-customers", state);
    }),
    customerChanged: create.reducer<Update<Customer, Customer["id"]>>(
      (state, action) => {
        customersAdapter.updateOne(state, action.payload);
        saveToLocalStorage("mb-customers", state);
      },
    ),
    customersDeleted: create.reducer<TSelectedCustomers>((state, action) => {
      customersAdapter.removeMany(state, action.payload);
      saveToLocalStorage("mb-customers", state);
    }),
  }),
});

export const { customerAdded, customerChanged, customersDeleted } =
  customersSlice.actions;

export const { selectAll: selectAllCustomers, selectById: selectCustomerById } =
  customersAdapter.getSelectors();

export default customersSlice.reducer;
