import { ERC20TokenABI } from "utils/constance";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract/types";

export class ERC20Methods {
  protected instance: Contract;
  constructor(web3: Web3, address: string) {
    this.instance = new web3.eth.Contract(ERC20TokenABI as AbiItem[], address);
  }
  symbol(): string {
    return this.instance.methods.symbol().call();
  }
  decimals(): number {
    return this.instance.methods.decimals().call();
  }
  async getInfo() {
    return {
      symbol: await this.symbol(),
      decimals: await this.decimals(),
    };
  }
}
