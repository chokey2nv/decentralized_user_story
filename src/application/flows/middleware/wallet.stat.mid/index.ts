import { Middleware } from "@reduxjs/toolkit";
import {
  GENERATE_STATS,
  UPDATE_SEARCH_BLOCKS_METADATA,
  UPDATE_WALLET_HISTORY,
} from "application/flows/actions/wallet.stat.action";
import { Infra } from "infrastructure";
import { validateInfra } from "../common/validate.infra";
import { generateUserStoryFlow } from "./generate.stats/index";
import { updateBlockMetadataFlow } from "./update.block.metadata";
import { updateSwapHistoryFlow } from "./update.history/index";

const walletStatMiddleWare =
  (infra: Promise<Infra>): Middleware =>
  (midwApi) =>
  (next) =>
  async (action) => {
    next(action);
    const appInfra = await validateInfra(infra);
    switch (action.type) {
      case UPDATE_SEARCH_BLOCKS_METADATA: {
        updateBlockMetadataFlow(appInfra, midwApi, action);
        break;
      }
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
