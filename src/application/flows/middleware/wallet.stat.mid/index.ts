import { Middleware } from "@reduxjs/toolkit";
import {
  GET_STAT_WALLET_TOKEN_ON_FIRST_TX,
  GET_STAT_WALLET_TX_COUNT,
  SET_STAT_WALLET,
} from "application/flows/actions/wallet.stat.action";
import { setWalletStat } from "application/reducers.slices/wallet.stat.core";
import AppInfrastructure, { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS } from "utils/constance";
import { Wallets } from "utils/types";
import { getTokenOnFirstTransactionFlow } from "./token.on.first.tx";
import { getWalletTxCountFlow } from "./tx.count";

const walletStatMiddleWare =
  (infra: Promise<Infra>): Middleware =>
  (midwApi) =>
  (next) =>
  async (action) => {
    next(action);
    let appInfra: Infra = await infra;
    if (!appInfra) {
      appInfra = (await AppInfrastructure.getInfrastructure(
        localStorage.getItem(LOCAL_STORAGE_PARAMS.wallet) as Wallets
      )) as Infra;
    }
    switch (action.type) {
      case SET_STAT_WALLET:
        midwApi.dispatch(setWalletStat(action.payload));
        break;
      case GET_STAT_WALLET_TX_COUNT:
        getWalletTxCountFlow(appInfra, midwApi, action);
        break;
      case GET_STAT_WALLET_TOKEN_ON_FIRST_TX:
        getTokenOnFirstTransactionFlow(appInfra, midwApi, action);
        break;
    }
  };
export default walletStatMiddleWare;
