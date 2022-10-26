import { configureStore } from "@reduxjs/toolkit";
import infra from "infrastructure";
import walletCore from "application/reducers.slices/wallet.core";
import noticeCore from "application/reducers.slices/notice.core";
import { LOCAL_STORAGE_PARAMS } from "utils/constance";
import { Wallets } from "utils/types";
import appMiddleware from "./flows/middleware";
// ...
const wallet = localStorage.getItem(LOCAL_STORAGE_PARAMS.wallet) as Wallets;
const store = configureStore({
  reducer: {
    wallet: walletCore,
    notice: noticeCore,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...appMiddleware.map((f: any) =>
        f(infra.getInfrastructure(wallet || "metamask"))
      )
    ),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
