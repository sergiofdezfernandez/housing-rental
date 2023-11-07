import { notification } from 'antd';
import { BrowserProvider, ethers, JsonRpcSigner, Contract, Eip1193Provider } from 'ethers';
import { useCallback, useState } from 'react';
import HousingRentalSystemContract from '../contracts/HousingRentalSystem.json';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}
export interface IWeb3State {
  address?: string;
  accountBalance?: string;
  currentChain?: number;
  signer?: JsonRpcSigner;
  provider?: BrowserProvider;
  isAuthenticated?: boolean;
  contract?: Contract;
  ethereum: unknown;
}

const useWeb3Provider = () => {
  const router = useRouter();

  const initialWeb3State = {
    address: undefined,
    currentChain: undefined,
    signer: undefined,
    provider: undefined,
    isAuthenticated: false,
    contract: undefined,
    ethereum: undefined,
    accountBalance: undefined,
  };
  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return;

    const { ethereum } = window;

    if (!ethereum) {
      notification.error({
        message: 'No se ha encontrado una wallet de ethereum',
      });
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const accounts: string[] = await provider.send('eth_requestAccounts', []);
    if (accounts.length > 0) {
      const signer = await provider.getSigner();
      const chain: number = Number(await (await provider.getNetwork()).chainId);
      const accountBalance: string = ethers.formatEther(
        await provider.send('eth_getBalance', [accounts[0]])
      );

      setState({
        ...state,
        address: accounts[0],
        signer,
        accountBalance,
        currentChain: chain,
        provider,
        isAuthenticated: true,
        contract: new Contract(process.env.address!, HousingRentalSystemContract.abi, signer),
        ethereum: ethereum,
      });
      localStorage.setItem('isAuthenticated', 'true');
      notification.success({
        message: 'Cartera conectada con éxito en la cuenta',
        description: accounts[0],
      });
    }
  }, [state]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem('isAuthenticated');
    notification.info({ message: 'Cartera desconectada' });
    router.push('/');
  };

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;
