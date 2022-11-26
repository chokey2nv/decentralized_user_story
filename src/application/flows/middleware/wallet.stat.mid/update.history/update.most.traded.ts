import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  ITrade,
  IUpdateHistoryAction,
  updateMostTraded,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";

export const updateSwapMostTradedFlow = async (
  _: Infra,
  { dispatch }: MiddlewareAPI,
  action: IUpdateHistoryAction
) => {
  const { networkId, hxs, address } = action.payload;
  const trades: ITrade[] = [];
  for (let i = 0; i < hxs.length; i++) {
    const { received } = hxs[i];
    const tradeIndex = trades.findIndex(
      (item) => item.address === received?.address
    );
    if (tradeIndex === -1) {
      trades.push({
        address: String(received?.address),
        count: 1,
        symbol: String(received?.symbol),
      });
    } else {
      trades[tradeIndex].count += 1;
    }
  }
  dispatch(updateMostTraded({ networkId, trades, address }));
};
