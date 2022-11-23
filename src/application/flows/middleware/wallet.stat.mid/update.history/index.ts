import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  IUpdateHistoryAction,
  updateHistory,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";
import { updateSwapFrequencyFlow } from "./update.swap.frequency";

export const updateSwapHistoryFlow = async (
  infra: Infra,
  midwApi: MiddlewareAPI,
  action: IUpdateHistoryAction
) => {
  updateSwapFrequencyFlow(infra, midwApi, action);
  midwApi.dispatch(updateHistory(action.payload));
};
