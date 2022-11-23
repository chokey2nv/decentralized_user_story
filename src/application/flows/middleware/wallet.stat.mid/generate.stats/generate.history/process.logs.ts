import { erc20TransferEventABI } from "utils/abis/abis";
import { ERC20Methods } from "utils/abis/common";
import { isTransferEvent, NETWORKS } from "utils/constance";
import { IDapp, SupportedNetworkId } from "utils/types";
import Web3 from "web3";
import { TransactionReceipt } from "web3-core/types";
import { BlockTransactionString } from "web3-eth/types";
import BigNumber from "big.js";
import {
  ISwapData,
  ITransferToken,
} from "application/reducers.slices/wallet.stat.core";
import { updateHistoryAction } from "application/flows/actions/wallet.stat.action";
import { AppDispatch } from "application/store";

function getSwap(
  swap: ISwapData,
  option: ITransferToken,
  dLog: Record<string, string>,
  address: string
) {
  if (dLog.from.toUpperCase() === address.toUpperCase()) {
    swap.sent = option;
  } else if (dLog.to.toUpperCase() === address.toUpperCase()) {
    swap.received = option;
  }
  return swap;
}
async function addDirectPayment(
  transactionHash: string,
  web3: Web3,
  networkId: string
) {
  const tx = await web3.eth.getTransaction(transactionHash);
  const network = NETWORKS.find((item) => item.id === networkId);
  if (!network) throw new Error("Problem getting network for sent token");
  return {
    address: "",
    amount: BigNumber(tx.value)
      .div(10 ** Number(network.decimals))
      .toFixed(),
    symbol: network?.symbol as string,
  };
}
export function processSwapLogs(
  dispatch: AppDispatch,
  web3: Web3,
  address: string,
  networkId: SupportedNetworkId,
  dapp: IDapp
) {
  return async function (
    receipts: (TransactionReceipt & { block: BlockTransactionString })[]
  ) {
    const data: ISwapData[] = [];
    for (let i = 0; i < receipts.length; i++) {
      const { logs, block, transactionHash } = receipts[i];
      if (!(await dapp.isDappEvent?.(web3, networkId, logs))) continue;
      let swap: ISwapData = {
        timestamp: block.timestamp,
        address
      };
      for (let j = 0; j < logs.length; j++) {
        const log = logs[j];
        const { topics } = log;
        if (!isTransferEvent(topics[0])) {
          continue;
        } else {
          try {
            const dLog = web3.eth.abi.decodeLog(
              erc20TransferEventABI,
              log.data,
              [topics[1], topics[2]]
            );
            const { symbol, decimals } = await new ERC20Methods(
              web3,
              log.address
            ).getInfo();
            console.log(dLog.value);
            const amount = BigNumber(dLog.value)
              .div(10 ** decimals)
              .toFixed();
            swap = getSwap(
              swap,
              {
                address: log.address,
                amount,
                symbol,
              },
              dLog,
              address
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (swap.received && !swap.sent) {
        swap.sent = await addDirectPayment(transactionHash, web3, networkId);
      }
      if (swap.received || swap.sent) data.push(swap);
    }
    if (data.length) {
      dispatch(updateHistoryAction({ networkId, hxs: data }));
    }
  };
}
