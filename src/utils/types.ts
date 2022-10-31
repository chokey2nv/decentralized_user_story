import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";

export type Wallets = "binance" | "metamask" | "trustWallet" | "walletConnect";
export type ExplorerName = "Etherscan" | "Polygonscan" | "Bscscan" | "Explorer";
export type NetowrkExplorerPath = "address" | "transaction" | "block";
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
  id: string;
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
