import {
  IBlockMetadata,
  ISwapData,
  WalletStatState,
} from "application/reducers.slices/wallet.stat.core";
import { DappName } from "utils/types";

const pkg = "[WALLET-STAT]";
export const GENERATE_STATS = `${pkg} get stats`;
export const UPDATE_WALLET_HISTORY = `${pkg} update wallet hxs`;
export const UPDATE_SEARCH_BLOCKS_METADATA = `${pkg} update search block meta`;

export interface IGenerateStoryActionPayload {
  dappName: DappName;
  contractAddress: string | undefined;
  username: string;
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
export function updateBlockMetadataAction(payload: IBlockMetadata) {
  return {
    type: UPDATE_SEARCH_BLOCKS_METADATA,
    payload,
  };
}
