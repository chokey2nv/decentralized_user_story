import { MiddlewareAPI } from "@reduxjs/toolkit";
import { connectWalletAction } from "application/flows/actions";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { setWalletStatAction } from "application/flows/actions/wallet.stat.action";
import { AppStore } from "application/store";
import AppInfrastructure, { Infra } from "infrastructure";
import { NETWORKS } from "utils/constance";
import Web3 from "web3";

function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
export const getTokenOnFirstTransactionFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: any
) => {
  try {
    const maxBlock = 5000;
    let fromBlock = 22483080;
    let toBlock = fromBlock + maxBlock;
    const web3: Web3 = infra?.web3;
    const { networkId /* address */ } = (getState as AppStore)().wallet;
    const address = "0x0db011018728d1b91ddb3c77933a40b9b68c9fa7";
    const log = await web3.eth
      .getPastLogs({
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      })
      .then(console.log);
    return console.log(log);
    const latestBlock = await web3.eth.getBlockNumber();
    let logs = await web3.eth.getPastLogs({
      address,
      fromBlock,
      toBlock,
    });
    console.log(latestBlock.toLocaleString(), "latest block");
    console.log(logs, fromBlock, toBlock);
    while (!logs.length && toBlock < latestBlock) {
      await wait(1);
      fromBlock += maxBlock;
      toBlock = fromBlock + maxBlock;
      console.log(fromBlock.toLocaleString(), toBlock.toLocaleString());
      logs = await (web3 as Web3).eth.getPastLogs({
        address,
        fromBlock,
        toBlock,
      });
      await console.log(logs);
    }
    console.log(logs);
  } catch (error: any) {
    infra.log(error);
  }
};
