import { MiddlewareAPI } from "@reduxjs/toolkit";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { IGenerateStoryActionPayload } from "application/flows/actions/wallet.stat.action";
import { updateBlockMetadata } from "application/reducers.slices/wallet.stat.core";
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
      dispatch,
      web3,
      address,
      networkId as SupportedNetworkId,
      dapp
    );
    //testing ends
    const latestBlock = 23202330; //await web3.eth.getBlockNumber();
    const blockRange = 10; //5000;
    let fromBlock = getBlockFrom(23202330, 0);
    let toBlock = getBlockTo(fromBlock, blockRange, latestBlock);
    dispatch(
      updateBlockMetadata({
        networkId,
        metadata: {
          fromBlock,
          toBlock,
          latestBlock,
        },
      })
    );
    swapProcessor(await getBlockLogs(fromBlock, toBlock));
    while (toBlock < latestBlock) {
      await wait(1);
      fromBlock = getBlockFrom(fromBlock, blockRange);
      toBlock += getBlockTo(toBlock, blockRange, latestBlock);
      dispatch(
        updateBlockMetadata({
          networkId,
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
};
