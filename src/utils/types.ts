import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Infra } from "infrastructure";

export type Wallets = "binance" | "metamask" | "trustWallet" | "walletConnect";
export interface Network {
  label: string;
  id: string;
  url?: string;
  symbol: string;
  name: string;
  decimals: number;
}
export interface MiddlewareHangle {
  infra: Infra;
  api: MiddlewareAPI;
}
