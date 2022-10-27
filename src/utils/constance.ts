import { Network } from "./types";
export const APP_NAME = "user_story";
export const LOCAL_STORAGE_PARAMS = {
  wallet: `${APP_NAME}_wallet`,
  address: `${APP_NAME}_address`,
  networkId: `${APP_NAME}_networkId`,
};
export const NETWORKS: Network[] = [
  {
    name: "Binance",
    id: "56",
    logoName: "binance",
    symbol: "BNB",
    decimals: 18,
  },
  {
    name: "Binance Test",
    id: "97",
    logoName: "binance",
    symbol: "BNB",
    decimals: 18,
  },
  {
    name: "Polygon",
    id: "137",
    symbol: "MATIC",
    logoName: "polygon",
    decimals: 18,
  },
  {
    name: "Polygon Test",
    id: "80001",
    symbol: "MATIC",
    logoName: "polygon",
    decimals: 18,
  },
];
