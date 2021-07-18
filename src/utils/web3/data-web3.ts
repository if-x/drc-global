import Web3 from "web3";

export const dataWeb3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/5baea93615bc4962a712f9f4af5c7cbb"
  )
);
