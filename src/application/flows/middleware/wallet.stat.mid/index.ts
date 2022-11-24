import { Middleware } from "@reduxjs/toolkit";
import {
  GENERATE_STATS,
  UPDATE_WALLET_HISTORY,
} from "application/flows/actions/wallet.stat.action";
import { Infra } from "infrastructure";
import { validateInfra } from "../common/validate.infra";
import { generateUserStoryFlow } from "./generate.stats/index";
import { updateSwapHistoryFlow } from "./update.history/index";

const walletStatMiddleWare =
  (infra: Promise<Infra>): Middleware =>
  (midwApi) =>
  (next) =>
  async (action) => {
    next(action);
    const appInfra = await validateInfra(infra);
    switch (action.type) {
      case UPDATE_WALLET_HISTORY: {
        updateSwapHistoryFlow(appInfra, midwApi, action);
        break;
      }
      case GENERATE_STATS:
        generateUserStoryFlow(appInfra, midwApi, action);
        break;
    }
  };
export default walletStatMiddleWare;
