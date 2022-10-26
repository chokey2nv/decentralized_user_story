import { Middleware } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";
import { CHANGE_NETWORK, CONNECT_WALLET } from "../../actions";
import { changeNetworkFlow } from "./change.network";
import { connectWalletFlow } from "./connect.wallet";

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
    }
  };
export default walletMiddleware;
