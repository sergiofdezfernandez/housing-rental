'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
const projectId = '594bfefecba4b2a63786a5d5c1874bb6';

const mainnet = {
  chainId: 97,
  name: 'BSCTestNet',
  currency: 'TBNB',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
};

const metadata = {
  name: 'Housing Rental',
  description: 'Alquiler de propiedades basado en web3.0',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
});

export function Web3ModalProvider({ children }: any) {
  return children;
}
