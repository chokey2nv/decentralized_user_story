import { Middleware } from "@reduxjs/toolkit";
import { disconnectAccount } from "application/reducers.slices/wallet.core";
import { Infra } from "infrastructure";
import {
  CHANGE_NETWORK,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
} from "../../actions";
import { changeNetworkFlow } from "./change.network";
import { connectWalletFlow } from "./connect.wallet";
import { disconnectWalletFlow } from "./disconnect.wallet";

const walletMiddleware =
  (infra: Promise<Infra>): Middleware =>
  (middleApi) =>
  (next) =>
  async (action) => {
    next(action);
    switch (action.type) {
      case CONNECT_WALLET:
        connectWalletFlow(infra, middleApi, action);
        break;
      case CHANGE_NETWORK:
        changeNetworkFlow(infra, middleApi, action);
        break;
      case DISCONNECT_WALLET:
        disconnectWalletFlow(infra, middleApi);
        break;
    }
  };
export default walletMiddleware;
