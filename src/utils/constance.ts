import {
  IDapp,
  NetowrkExplorer,
  Network,
  SupportedNetworkId,
  Wallet,
} from "./types";
import { Contract } from "web3-eth-contract/types";
import pancakeFactoryABI from "./abis/pancake.factory.json";
import ERC20TokenABI from "./abis/ERC20.json";
import pancakePairABI from "./abis/pancake.pair.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils/types";
import { Log } from "web3-core/types";
import { wait } from "./common";

export { ERC20TokenABI };
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
export function isSwapEvent(eventSign: string) {
  const eventHash = Web3.utils.sha3(
    "Swap(address,uint256,uint256,uint256,uint256,address)"
  );
  return eventSign === eventHash;
}
export function isTransferEvent(eventSign: string) {
  const eventHash = Web3.utils.sha3("Transfer(address,address,uint256)");
  return eventSign === eventHash;
}
export const dappPancakeSwap: IDapp = {
  label: "PancakeSwap",
  name: "pancakeSwap",
  networks: {
    [NETWORK_IDS.BINANCE]: {
      factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    },
  },
  abis: {
    factory: pancakeFactoryABI as AbiItem[],
  },
  async isDappEvent(web3: Web3, networkId: SupportedNetworkId, logs: Log[]) {
    const swapLog = logs[logs.length - 1];
    if (!isSwapEvent(swapLog.topics[0])) return false;
    else {
      return this.isPairAddress?.(swapLog.address, web3, networkId) || false;
    }
  },
  getFactory(web3: Web3, networkId: SupportedNetworkId): Contract {
    return new web3.eth.Contract(
      this.abis?.factory as AbiItem[],
      this.networks?.[networkId]?.factory
    );
  },
  async isPairAddress(
    address: string,
    web3: Web3,
    networkId: SupportedNetworkId
  ) {
    try {
      const pairContract = new web3.eth.Contract(
        pancakePairABI as AbiItem[],
        address
      );
      const factory = await pairContract.methods.factory().call();
      return factory === this.networks?.[networkId]?.factory;
    } catch (error) {
      // console.log(error);
      wait(2);
      return false;
    }
  },
};
export type IDappPancakeSwap = typeof dappPancakeSwap;
export const dappQuickSwap: IDapp = {
  label: "Quick Swap",
  name: "quickSwap",
};
export const dappSmartSwap: IDapp = {
  label: "SmartSwap",
  name: "smartSwap",
};
export const dappP2P: IDapp = {
  label: "P2P",
  name: "p2p",
};
export const dappOpensea: IDapp = {
  label: "Opensea",
  name: "opensea",
};
export const dappNFTrade: IDapp = {
  label: "NFTrade",
  name: "nftTrade",
};
export const dappRefinable: IDapp = {
  label: "Refinable",
  name: "refinable",
};
export const DAPPS = [dappPancakeSwap, dappQuickSwap, dappSmartSwap, dappP2P];
export const DAPPS_NFT = [dappOpensea, dappNFTrade, dappRefinable];
export const ALL_DAPPS = [...DAPPS, ...DAPPS_NFT];
