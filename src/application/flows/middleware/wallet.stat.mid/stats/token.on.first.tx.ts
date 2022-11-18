import { MiddlewareAPI } from "@reduxjs/toolkit";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { IGenerateStoryActionPayload } from "application/flows/actions/wallet.stat.action";
import { AppStore } from "application/store";
import { Infra } from "infrastructure";
import { ALL_DAPPS } from "utils/constance";
import { DappName, SupportedNetworkId } from "utils/types";
import Web3 from "web3";
import { PancakeSwapEventAbi } from "../../../../../utils/abis/abis";

function address64Bit(address: string) {
  return `0x${String(address).substring(2).padStart(64, "0")}`;
}
function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
function blockLogs(
  web3: Web3,
  contractAddress: string,
  accountAddress: string,
  eventHash: string
) {
  return async function (fromBlock: number, toBlock: number) {
    const logs = await web3.eth.getPastLogs({
      fromBlock,
      toBlock,
      // address: contractAddress,
      topics: [eventHash, address64Bit(accountAddress)],
    });
    console.log(logs);
    return logs.map((log) => {
      console.log(log);
      return web3.eth.abi.decodeLog(PancakeSwapEventAbi, log.data, [
        log.topics[1],
        log.topics[2],
      ]);
    });
  };
}
function validateSelectedDapp(networkId: string, dappName: DappName) {
  const dapp = ALL_DAPPS.find((item) => item.name === dappName);
  if (!dapp) throw new Error(`Dapp for ${dappName} not seen`);

  const LPAddress = dapp?.networks?.[networkId as SupportedNetworkId]
    ?.LPAddress as string;

  if (!LPAddress) throw new Error(`LP Address for ${dapp?.label} not found!`);
  return LPAddress;
}
export const getTokenOnFirstTransactionFlow = async (
  infra: Infra,
  { dispatch, getState }: MiddlewareAPI,
  action: any
) => {
  try {
    const web3: Web3 = infra?.web3;
    //testing starts
    const eventHash = web3.eth.abi.encodeEventSignature(
      "Swap(address,uint256,uint256,uint256,uint256,address)"
    );
    const { dappName, contractAddress, username } =
      (action.payload as IGenerateStoryActionPayload) || {};
    const { networkId, address } = (getState as AppStore)().wallet;
    let LPAddress =
      contractAddress || validateSelectedDapp(networkId, dappName);
    // web3.eth.getTransactionReceipt()
    const getBlockLogs = blockLogs(
      web3,
      LPAddress as string,
      "0x10ed43c718714eb63d5aa57b78b54704e256024e" || address,
      String(eventHash)
    );
    //testing ends
    const latestBlock = await web3.eth.getBlockNumber();
    const blockRange = 10; //5000;
    let fromBlock = 22583080;
    let toBlock = fromBlock + blockRange;
    const logs = await getBlockLogs(fromBlock, toBlock);
    while (!logs.length && toBlock < latestBlock) {
      await wait(1);
      fromBlock += blockRange;
      toBlock += blockRange;
      const log = await getBlockLogs(fromBlock, toBlock);
      logs.concat(log);
    }
    console.log(logs);
  } catch (error: any) {
    infra.log(error);
    dispatch(showErrorNotice(error?.message));
  }
};
