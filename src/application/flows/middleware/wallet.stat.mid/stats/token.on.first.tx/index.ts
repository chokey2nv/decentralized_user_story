import { MiddlewareAPI } from "@reduxjs/toolkit";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { IGenerateStoryActionPayload } from "application/flows/actions/wallet.stat.action";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import { wait } from "utils/common";
import { ALL_DAPPS } from "utils/constance";
import { DappName, SupportedNetworkId } from "utils/types";
import Web3 from "web3";
import { blockLogs } from "./get.logs";
import { processSwapLogs } from "./process.logs";

function validateSelectedDapp(dappName: DappName) {
  const dapp = ALL_DAPPS.find((item) => item.name === dappName);
  if (!dapp) throw new Error(`Dapp for ${dappName} not seen`);
  return dapp;
}
export const getTokenOnFirstTransactionFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: any
) => {
  try {
    const web3: Web3 = infra?.web3;
    const { dappName, contractAddress, username } =
      (action.payload as IGenerateStoryActionPayload) || {};
    let { networkId, address } = (getState as AppStore)().wallet;

    // for testing
    // address = "0x1aefcabeac10d24c981084fee6120d59d57c0d3d";
    address = "0xc8cb5c7ebe866f7bf64246075d53cf4f09b48e9e";

    let dapp = validateSelectedDapp(dappName);
    const getBlockLogs = blockLogs(web3, address);
    const swapProcessor = processSwapLogs(
      web3,
      address,
      networkId as SupportedNetworkId,
      dapp
    );
    //testing ends
    const latestBlock = 23202330; //await web3.eth.getBlockNumber();
    const blockRange = 10; //5000;
    let fromBlock = 23202330;
    let toBlock = fromBlock + blockRange;
    const logs = await swapProcessor(await getBlockLogs(fromBlock, toBlock));
    while (toBlock < latestBlock) {
      await wait(1);
      fromBlock += blockRange;
      toBlock += blockRange;
      const log = await swapProcessor(await getBlockLogs(fromBlock, toBlock));
      logs.concat(log);
    }
  } catch (error: any) {
    infra.log(error);
    dispatch(showErrorNotice(error?.message));
  }
};
