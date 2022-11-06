import { MiddlewareAPI } from "@reduxjs/toolkit";
import { setWalletStatAction } from "application/flows/actions/wallet.stat.action";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import Web3 from "web3";

export const getWalletTxCountFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: any
) => {
  try {
    const { web3 } = infra || {};
    const { networkId, address } = (getState as AppStore)().wallet;
    const txCount = await (web3 as Web3).eth.getTransactionCount(address);
    dispatch(
      setWalletStatAction(networkId, {
        address,
        txCount: Number(txCount || 0),
      })
    );
  } catch (error: any) {
    infra.log(error);
  }
};
