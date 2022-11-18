import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";

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
}
export interface MiddlewareHangle {
  infra: Infra;
  api: MiddlewareAPI;
}
export interface IDapp<T> {
  label: string;
  name: DappName;
  networks?: Partial<Record<SupportedNetworkId, T>>;
}
export interface DappContractBase {
  routerAddress: string;
  LPAddress: string;
}
// LPAddress: "0x7f1b11a798273dA438b4b132dF1383d8387e73b4",
