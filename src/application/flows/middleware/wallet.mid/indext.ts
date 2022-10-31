import { Middleware } from "@reduxjs/toolkit";
import { setNetworkId } from "application/reducers.slices/wallet.core";
import { Infra } from "infrastructure";
import {
  CHANGE_NETWORK,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  NEW_WALLET_CONNECTION,
  SET_WALLET_NETWORK_ID,
} from "../../actions";
import { changeNetworkFlow } from "./change.network";
import { connectWalletFlow } from "./connect.wallet";
import { disconnectWalletFlow } from "./disconnect.wallet";
import { newWalletConnectionFlow } from "./new.connect.wallet";

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
      case NEW_WALLET_CONNECTION:
        newWalletConnectionFlow(infra, middleApi, action);
        break;
      case SET_WALLET_NETWORK_ID:
        middleApi.dispatch(setNetworkId(action.payload))
        break;
    }
  };
export default walletMiddleware;
