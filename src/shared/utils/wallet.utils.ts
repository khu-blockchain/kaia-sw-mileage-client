const sliceWalletAddress = (address: string) =>
  address.slice(0, 5) + "..." + address.slice(-3);

export { sliceWalletAddress };
