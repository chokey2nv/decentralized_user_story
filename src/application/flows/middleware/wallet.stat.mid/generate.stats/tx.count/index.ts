import { MiddlewareAPI } from "@reduxjs/toolkit";
import { updateTxCount } from "application/reducers.slices/wallet.stat.core";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import Web3 from "web3";

export const walletTxCountFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI
) => {
  try {
    const { web3 } = infra || {};
    const { networkId, address } = (getState as AppStore)().wallet;
    const count = await (web3 as Web3).eth.getTransactionCount(address);
    dispatch(
      updateTxCount({
        networkId,
        txCount: { address, count },
      })
    );
  } catch (error: any) {
    infra.log(error);
  }
};
