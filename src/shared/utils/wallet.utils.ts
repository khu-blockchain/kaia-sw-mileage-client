const sliceWalletAddress = (address: string) =>
  address.slice(0, 6) + "..." + address.slice(-3);

export { sliceWalletAddress };
