import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";
import { walletTxCountFlow } from "./tx.count";
import { generateSwapHistoryFlow } from "./generate.history";

export const generateUserStoryFlow = async (
  infra: Infra,
  midwApi: MiddlewareAPI,
  action: any
) => {
  walletTxCountFlow(infra, midwApi);
  generateSwapHistoryFlow(infra, midwApi, action);
};
