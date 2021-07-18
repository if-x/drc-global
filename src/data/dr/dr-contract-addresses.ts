export const drContractAddresses = {
  ropsten: {
    s1: "0x140D3Bb74645d4457f9953d2FA7c9be7f6C221c4",
    s2: "0xAF1640cDEb03F3Ec31dDb5ee1b0B8C548D929A8C",
    s3: "0xA8102710E791Af02E6002EAD550CA1F2bae40D14",
  },
  mainnet: {
    s1: "0x5f60044aa68279fCDFBe1EAbE73Da4B91e30AB76",
    s2: "0xa5fa9397A6a4E23779780c892482Aa12db4f18bd",
    s3: "0x6fB60915a541919F497a7DB044541919EC92DFBE",
  },
};

export const drWithdrawalAddress = {
  ropsten: "0x952F2454Af63BD3e99DFD901f9928497FBb42711",
  mainnet: "0xB70A8A280fCb3a40Eb7d6325b97E51777a158642",
};

export const getWithdrawalContractAddress = (chainId: number) =>
  chainId === 3 ? drWithdrawalAddress.ropsten : drWithdrawalAddress.mainnet;

export const drcVaultAddress = {
  ropsten: "0xa793274757704Bbbef5D4C62Aa1d826b9911d259",
  mainnet: "0x3E26C0D4C89793d7652484075eFb20b8758a5Df3",
};
