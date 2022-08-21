import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.MATIC_MUMBAI,
};

export const alchemy = new Alchemy(config);
