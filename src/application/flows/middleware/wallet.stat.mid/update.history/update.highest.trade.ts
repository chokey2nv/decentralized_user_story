import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  ITransferToken,
  IUpdateHistoryAction,
  updateHighestTradeToken,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";

export const updateHighestTradeTokenFlow = async (
  _: Infra,
  { dispatch }: MiddlewareAPI,
  action: IUpdateHistoryAction
) => {
  const { networkId, hxs, address } = action.payload;
  let highestAmount: number = 0;
  let token: ITransferToken | undefined = undefined;
  for (let i = 0; i < hxs.length; i++) {
    const { sent } = hxs[i];
    if (Number(sent?.amount) > highestAmount) token = sent as ITransferToken;
  }
  if (token) {
    dispatch(updateHighestTradeToken({ networkId, token, address }));
  }
};
