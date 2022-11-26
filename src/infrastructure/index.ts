import { NETWORKS } from "utils/constance";
import { Wallets } from "utils/types";
import Web3 from "web3";
import getWeb3 from "./getWeb3";

export interface Infra {
  supportedIds: string[];
  log: typeof console.log;
  web3: Web3;
  accounts: string[] | undefined;
  wallet: Wallets;
}
class AppInfrastructure {
  static infraWeb3: any;
  static infraAccounts: string[];
  static supportedIds = [...NETWORKS.map((item) => item.id)];
  static log = console.log;
  static wallet: string;

  async init(wallet: Wallets) {
    const { web3, accounts } = await getWeb3(wallet);
    AppInfrastructure.infraWeb3 = web3;
    AppInfrastructure.infraAccounts = accounts;
    AppInfrastructure.wallet = wallet;
  }
  static async getWeb3(wallet: Wallets) {
    if (!this.infraWeb3) {
      const infra = new AppInfrastructure();
      await infra.init(wallet);
    }
    return this.infraWeb3;
  }
  static async getAccounts(wallet: Wallets) {
    if (!this.infraAccounts) {
      const infra = new AppInfrastructure();
      await infra.init(wallet);
    }
    return this.infraAccounts;
  }
  static async getInfrastructure(
    wallet: Wallets
  ): Promise<Infra | undefined | null> {
    if (!wallet) return null;
    return {
      supportedIds: this.supportedIds,
      log: this.log,
      web3: await this.getWeb3(wallet),
      accounts: await this.getAccounts(wallet),
      wallet,
    };
  }
}
export default AppInfrastructure;
