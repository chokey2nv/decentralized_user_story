import {
  IDapp,
  NetowrkExplorer,
  Network,
  SupportedNetworkId,
  Wallet,
} from "./types";
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
export const NETWORK_IDS: Record<string, SupportedNetworkId> = {
  BINANCE: "56",
  BINANCE_TEST: "97",
  POLYGON: "137",
  POLYGON_TEST: "80001",
};
export const dappPancakeSwap: IDapp<{ LPAddress: string }> = {
  label: "PancakeSwap",
  name: "pancakeSwap",
  networks: {
    [NETWORK_IDS.BINANCE]: {
      LPAddress: "0x7f1b11a798273dA438b4b132dF1383d8387e73b4",
    },
  },
};
export const dappQuickSwap: IDapp<undefined> = {
  label: "Quick Swap",
  name: "quickSwap",
};
export const dappSmartSwap: IDapp<undefined> = {
  label: "SmartSwap",
  name: "smartSwap",
};
export const dappP2P: IDapp<undefined> = {
  label: "P2P",
  name: "p2p",
};
export const dappOpensea: IDapp<undefined> = {
  label: "Opensea",
  name: "opensea",
};
export const dappNFTrade: IDapp<undefined> = {
  label: "NFTrade",
  name: "nftTrade",
};
export const dappRefinable: IDapp<undefined> = {
  label: "Refinable",
  name: "refinable",
};
export const DAPPS = [dappPancakeSwap, dappQuickSwap, dappSmartSwap, dappP2P];
export const DAPPS_NFT = [dappOpensea, dappNFTrade, dappRefinable];
export const ALL_DAPPS = [...DAPPS, ...DAPPS_NFT];
