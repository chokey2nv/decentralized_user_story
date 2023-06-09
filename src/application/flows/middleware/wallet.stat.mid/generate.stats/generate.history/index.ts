import { MiddlewareAPI } from "@reduxjs/toolkit";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { IGenerateStoryActionPayload } from "application/flows/actions/wallet.stat.action";
import {
  clearHistoryy,
  updateBlockMetadata,
  updateIsSearchingHx,
} from "application/reducers.slices/wallet.stat.core";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import { wait } from "utils/common/index";
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
function getBlockFrom(block: number, blockRange: number) {
  block += blockRange;
  return Math.max(1, block);
}
function getBlockTo(block: number, blockRange: number, latestBlock: number) {
  block += blockRange;
  return Math.min(latestBlock, block);
}
export const generateSwapHistoryFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: any
) => {
  const { networkId, address } = (getState as AppStore)().wallet;
  dispatch(updateIsSearchingHx({ networkId, address, isSeaerching: true }));
  try {
    const web3: Web3 = infra?.web3;
    const {
      dappName,
      fromBlock: apiFromBlock,
      contractAddress,
      username,
    } = (action.payload as IGenerateStoryActionPayload) || {};
    let dapp = validateSelectedDapp(dappName);
    const getBlockLogs = blockLogs(web3, address);
    const swapProcessor = processSwapLogs(
      dispatch,
      web3,
      address,
      networkId as SupportedNetworkId,
      dapp
    );
    //testing ends
    // const latestBlock = 23202330; //await web3.eth.getBlockNumber();
    const latestBlock = await web3.eth.getBlockNumber();
    const blockRange = 4000;
    // let fromBlock = getBlockFrom(23202330, 0);
    let fromBlock = getBlockFrom(Number(apiFromBlock) || 1, 0);
    let toBlock = getBlockTo(fromBlock, blockRange, latestBlock);
    dispatch(clearHistoryy({ networkId, address }));
    dispatch(
      updateBlockMetadata({
        networkId,
        address,
        metadata: {
          fromBlock,
          toBlock,
          latestBlock,
        },
      })
    );
    swapProcessor(await getBlockLogs(fromBlock, toBlock));
    while (toBlock < latestBlock) {
      await wait(10);
      fromBlock = getBlockFrom(fromBlock, blockRange);
      toBlock = getBlockTo(toBlock, blockRange, latestBlock);
      dispatch(
        updateBlockMetadata({
          networkId,
          address,
          metadata: {
            fromBlock,
            toBlock,
          },
        })
      );
      swapProcessor(await getBlockLogs(fromBlock, toBlock));
    }
  } catch (error: any) {
    infra.log(error);
    dispatch(showErrorNotice(error?.message));
  }
  dispatch(updateIsSearchingHx({ networkId, address, isSeaerching: false }));
};
