import { configureStore } from "@reduxjs/toolkit";
import { LocationApi } from "./AddressApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [LocationApi.reducerPath]: LocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LocationApi.middleware),
});

export default store;
// setupListeners(store.dispatch);
