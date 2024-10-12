import customerSliceReducer from "@/features/customers/customersSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: customerSliceReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
