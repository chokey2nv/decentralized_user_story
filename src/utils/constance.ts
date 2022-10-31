import { NetowrkExplorer, Network } from "./types";
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
