import { address64Bit } from "utils/common";
import Web3 from "web3";

export function blockLogs(web3: Web3, accountAddress: string) {
  return async function (fromBlock: number, toBlock: number) {
    const eventHash = web3.eth.abi.encodeEventSignature(
      "Swap(address,uint256,uint256,uint256,uint256,address)"
    );
    const logs = await web3.eth.getPastLogs({
      fromBlock,
      toBlock,
      topics: [eventHash, null, address64Bit(accountAddress)],
    });
    const txList: Record<string, boolean> = {};
    const txs = [];
    for (let i = 0; i < logs.length; i++) {
      const { transactionHash } = logs[i];
      if (!txList[transactionHash]) {
        txList[transactionHash] = true;
        const receipt = await web3.eth.getTransactionReceipt(transactionHash);
        const block = await web3.eth.getBlock(receipt.blockNumber);
        txs.push({
          ...receipt,
          block,
        });
        console.log(txs);
      }
    }
    return txs;
  };
}
