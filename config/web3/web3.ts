import { Web3Provider } from '@ethersproject/providers';
import { getNetwork } from '@ethersproject/networks';
import { ethers } from 'ethers';

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const getNetworkName = async (chainId: number) => {
  const network = await getNetwork(chainId);
  return network.name;
};

export const getSigner = (library: Web3Provider) => {
  return library.getSigner();
};