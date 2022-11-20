export const PancakeSwapEventAbi = [
  {
    indexed: true,
    internalType: "address",
    name: "sender",
    type: "address",
  },
  {
    indexed: false,
    internalType: "uint256",
    name: "amount0In",
    type: "uint256",
  },
  {
    indexed: false,
    internalType: "uint256",
    name: "amount1In",
    type: "uint256",
  },
  {
    indexed: false,
    internalType: "uint256",
    name: "amount0Out",
    type: "uint256",
  },
  {
    indexed: false,
    internalType: "uint256",
    name: "amount1Out",
    type: "uint256",
  },
  { indexed: true, internalType: "address", name: "to", type: "address" },
];
export const erc20TransferEventABI = [
  {
    indexed: true,
    name: 'from',
    type: 'address'
  },
  {
    indexed: true,
    name: 'to',
    type: 'address'
  },
  {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }
];
