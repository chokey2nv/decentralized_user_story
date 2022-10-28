import { Network } from "./types";
export const APP_NAME = "user_story";
export const LOCAL_STORAGE_PARAMS = {
  wallet: `${APP_NAME}_wallet`,
  address: `${APP_NAME}_address`,
  networkId: `${APP_NAME}_networkId`,
};
export const NETWORKS: Network[] = [
  {
    label: "Binance",
    id: "56",
    name: "binance",
    symbol: "BNB",
    decimals: 18,
  },
  {
    label: "Binance Test",
    id: "97",
    name: "binance",
    symbol: "BNB",
    decimals: 18,
  },
  {
    label: "Polygon",
    id: "137",
    symbol: "MATIC",
    name: "polygon",
    decimals: 18,
  },
  {
    label: "Polygon Test",
    id: "80001",
    symbol: "MATIC",
    name: "polygon",
    decimals: 18,
  },
];
