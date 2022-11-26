import { MiddlewareAPI } from "@reduxjs/toolkit";
import { updateTxCount } from "application/reducers.slices/wallet.stat.core";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import { NETWORKS } from "utils/constance";
import Web3 from "web3";

export const walletTxCountFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI
) => {
  try {
    const { web3 } = infra || {};
    const { networkId, address } = (getState as AppStore)().wallet;
    const count = await web3.eth.getTransactionCount(address);
    const blockNumber = await web3.eth.getBlockNumber();
    const network = NETWORKS.find((item) => item.id.toString() === networkId);
    const totalTxs = blockNumber * Number(network?.blockTxs || 0);
    const percent = (count / totalTxs) * 100;
    dispatch(
      updateTxCount({
        networkId,
        txCount: { address, count, percent },
      })
    );
  } catch (error: any) {
    infra.log(error);
  }
};
