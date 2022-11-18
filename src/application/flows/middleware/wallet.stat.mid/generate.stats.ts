import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";
import { getTokenOnFirstTransactionFlow } from "./stats/token.on.first.tx";
import { getWalletTxCountFlow } from "./stats/tx.count";

export const generateUserStoryFlow = async (
  infra: Infra,
  midwApi: MiddlewareAPI,
  action: any
) => {
  getWalletTxCountFlow(infra, midwApi);
  getTokenOnFirstTransactionFlow(infra, midwApi, action);
};
