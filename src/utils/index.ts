const utils = {
  shortAddress(address: string): string {
    if (!address) return "...";
    return (
      String(address).substring(0, 4) +
      "..." +
      String(address).substring(address.length - 4)
    );
  },
};
export default utils;
