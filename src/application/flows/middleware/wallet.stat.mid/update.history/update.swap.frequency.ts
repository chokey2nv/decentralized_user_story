import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  IFrequency,
  IUpdateHistoryAction,
  updateSwapFrequency,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";

export const updateSwapFrequencyFlow = async (
  _: Infra,
  { dispatch }: MiddlewareAPI,
  action: IUpdateHistoryAction
) => {
  const { networkId, hxs, address } = action.payload;
  const list: IFrequency = {};
  for (let i = 0; i < hxs.length; i++) {
    const { sent, received } = hxs[i];
    const key = `${sent?.address}-${received?.address}`;
    if (list[key]) list[key] += 1;
    else list[key] = 1;
  }
  dispatch(updateSwapFrequency({ networkId, frequency: list, address }));
};
