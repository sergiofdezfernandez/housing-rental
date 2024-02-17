import React, { createContext, useContext, useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import HousingRentalSystemContract from '@/contracts/HousingRentalSystem.json';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';

export interface IContractContext {
  contractInstance: Contract | undefined;
}
const ContractContext = createContext<IContractContext | null>(null);

export function ContractProvider({ children }: any) {
  const [contractInstance, setContractInstance] = useState<Contract>();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    const createContract = async () => {
      try {
        if (!walletProvider) {
          return;
        }
        const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contract = new Contract(
          HousingRentalSystemContract.networks[97]?.address,
          HousingRentalSystemContract.abi,
          signer
        );
        setContractInstance(contract);
      } catch (error) {
        console.error('Error creating contract:', error);
      }
    };
    createContract();
  }, [walletProvider]);

  return (
    <ContractContext.Provider value={{ contractInstance }}>{children}</ContractContext.Provider>
  );
}
export default ContractProvider;

export const useContractContext = () => useContext(ContractContext);
