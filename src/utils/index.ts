import { NetowrkExplorerPath, Network } from "./types";

const utils = {
  shortAddress(address: string): string {
    if (!address) return "...";
    return (
      String(address).substring(0, 4) +
      "..." +
      String(address).substring(address.length - 4)
    );
  },
  walletExplorer(
    network: Network | undefined,
    path?: NetowrkExplorerPath,
    data?: string
  ) {
    if (!network) return null;
    if (!path) return network?.explorer?.label || "Explorer";
    if (!data) throw new Error("arg [data] is missing");
    const { base, blockPath, addressPath, txPath } = network?.explorer?.url;
    switch (path) {
      case "address":
        return String(base + addressPath).replace("[address]", data);
      case "transaction":
        return String(base + txPath).replace("[tx]", data);
      case "block":
        return String(base + blockPath).replace("[block]", data);
    }
  },
};
export default utils;
