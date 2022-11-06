import { IDapps, NetowrkExplorer, Network, Wallet } from "./types";
export const APP_NAME = "user_story";
export const LOCAL_STORAGE_PARAMS = {
  wallet: `${APP_NAME}_wallet`,
  address: `${APP_NAME}_address`,
  networkId: `${APP_NAME}_networkId`,
};
export const BSCExplorer = (base: string): NetowrkExplorer => ({
  label: "Bscscan",
  url: {
    base,
    addressPath: "/address/[address]",
    txPath: "/tx/[tx]",
    blockPath: "/block/[block]",
  },
});
export const PolygonExplorer = (base: string): NetowrkExplorer => ({
  label: "Bscscan",
  url: {
    base,
    addressPath: "/address/[address]",
    txPath: "/tx/[tx]",
    blockPath: "/block/[block]",
  },
});
export const WALLETS: Wallet[] = [
  {
    label: "Metamask",
    name: "metamask",
  },
  {
    label: "Trust Wallet",
    name: "trustWallet",
  },
];
export const NETWORKS: Network[] = [
  {
    label: "Binance",
    id: "56",
    name: "binance",
    symbol: "BNB",
    decimals: 18,
    explorer: BSCExplorer("https://bscscan.com"),
  },
  {
    label: "Binance Test",
    id: "97",
    name: "binance",
    symbol: "BNB",
    decimals: 18,
    explorer: BSCExplorer("https://testnet.bscscan.com"),
  },
  {
    label: "Polygon",
    id: "137",
    symbol: "MATIC",
    name: "polygon",
    decimals: 18,
    explorer: PolygonExplorer("https://polygonscan.com"),
  },
  {
    label: "Polygon Test",
    id: "80001",
    symbol: "MATIC",
    name: "polygon",
    decimals: 18,
    explorer: PolygonExplorer("https://mumbai.polygonscan.com`"),
  },
];
export const DAPPS: IDapps[] = [
  {
    label: "PancakeSwap",
    name: "pancakeSwap",
  },
  {
    label: "QuickSwap",
    name: "quickSwap",
  },
  {
    label: "SmartSwap",
    name: "smartSwap",
  },
  {
    label: "P2P",
    name: "p2p",
  },
];
export const DAPPS_NFT: IDapps[] = [
  {
    label: "Opensea",
    name: "opensea",
  },
  {
    label: "NFTrade",
    name: "nftTrade",
  },
  {
    label: "Refinable",
    name: "refinable",
  },
];
