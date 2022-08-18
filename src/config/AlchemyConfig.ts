import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.MATIC_MAINNET,
};

export const alchemy = new Alchemy(config);
