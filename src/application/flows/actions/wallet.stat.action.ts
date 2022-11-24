import { ISwapData } from "application/reducers.slices/wallet.stat.core";
import { DappName } from "utils/types";

const pkg = "[WALLET-STAT]";
export const GENERATE_STATS = `${pkg} get stats`;
export const UPDATE_WALLET_HISTORY = `${pkg} update wallet hxs`;

export interface IGenerateStoryActionPayload {
  username: string;
  dappName: DappName;
  contractAddress?: string | undefined;
}
export function generateStoryAction(payload: IGenerateStoryActionPayload) {
  return {
    type: GENERATE_STATS,
    payload,
  };
}
export function updateHistoryAction(payload: {
  networkId: string;
  hxs: ISwapData[];
}) {
  return {
    type: UPDATE_WALLET_HISTORY,
    payload,
  };
}
