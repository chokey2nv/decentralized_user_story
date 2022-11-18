import { Middleware } from "@reduxjs/toolkit";
import {
  GENERATE_STATS,
  SET_STAT_WALLET,
} from "application/flows/actions/wallet.stat.action";
import { setWalletStat } from "application/reducers.slices/wallet.stat.core";
import AppInfrastructure, { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS } from "utils/constance";
import { Wallets } from "utils/types";
import { generateUserStoryFlow } from "./generate.stats";

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
      case GENERATE_STATS:
        generateUserStoryFlow(appInfra, midwApi, action);
        break;
    }
  };
export default walletStatMiddleWare;
