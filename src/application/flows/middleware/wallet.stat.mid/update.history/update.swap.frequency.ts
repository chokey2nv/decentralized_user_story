import { MiddlewareAPI } from "@reduxjs/toolkit";
import { WalletState } from "application/reducers.slices/wallet.core";
import {
  IUpdateHistoryAction,
  IWalletStat,
  updateSwapFrequency,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";

export const updateSwapFrequencyFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: IUpdateHistoryAction
) => {
  const { networkId, hxs } = action.payload;
  let { swapFrequeryList: list } =
    (getState().walletStat as IWalletStat)?.[networkId] || {};
  const { address } = (getState().wallet as WalletState) || {};
  let swapFrequeryList = { ...(list || {}) };
  for (let i = 0; i < hxs.length; i++) {
    const hx = hxs[i];
    const key = `${hx.sent?.address}-${hx.received?.address}`;
    if (!swapFrequeryList[address] || !swapFrequeryList[address][key]) {
      swapFrequeryList[address] = { [key]: 1 };
    } else {
      swapFrequeryList[address][key] += 1;
    }
  }
  dispatch(updateSwapFrequency({ networkId, frequency: swapFrequeryList }));
};
