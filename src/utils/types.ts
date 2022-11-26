import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";
import Web3 from "web3";
import { Log } from "web3-core/types";
import { AbiItem } from "web3-utils/types";
import { Contract } from "web3-eth-contract/types";

export type { AbiItem };
export type Wallets = "binance" | "metamask" | "trustWallet" | "walletConnect";
export interface Wallet {
  label: string;
  name: Wallets;
}
export type ExplorerName = "Etherscan" | "Polygonscan" | "Bscscan" | "Explorer";
export type NetowrkExplorerPath = "address" | "transaction" | "block";
export type SupportedNetworkId = "56" | "97" | "80001" | "137";
export type ISwap = "pancakeSwap" | "quickSwap" | "smartSwap" | "p2p";
export type INFT = "opensea" | "nftTrade" | "refinable";
export type DappName = ISwap | INFT;
export interface NetowrkExplorer {
  label: ExplorerName;
  url: {
    base: string;
    addressPath: string;
    txPath: string;
    blockPath: string;
  };
}
export interface Network {
  label: string;
  id: SupportedNetworkId;
  url?: string;
  symbol: string;
  name: string;
  decimals: number;
  explorer: NetowrkExplorer;
  blockTxs: number;
}
export interface MiddlewareHangle {
  infra: Infra;
  api: MiddlewareAPI;
}
export interface IDapp {
  label: string;
  name: DappName;
  networks?: Partial<Record<SupportedNetworkId, { factory: string }>>;
  abis?: { factory: AbiItem[] };
  getFactory?: (web3: Web3, networkId: SupportedNetworkId) => Contract;
  isDappEvent?: (
    web3: Web3,
    networkId: SupportedNetworkId,
    logs: Log[]
  ) => Promise<boolean>;
  isPairAddress?: (
    address: string,
    web3: Web3,
    networkId: SupportedNetworkId
  ) => Promise<boolean>;
}
export interface DappContractBase {
  routerAddress: string;
  LPAddress: string;
}
// LPAddress: "0x7f1b11a798273dA438b4b132dF1383d8387e73b4",
