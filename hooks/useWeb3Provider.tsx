import { message, notification } from "antd";
import { BrowserProvider, ethers, JsonRpcSigner, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import HousingRentalSystemContract from "../contracts/HousingRentalSystem.json";
import { useRouter } from "next/router";
import { url } from "inspector";

declare var window: any;

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
  contract: any | null;
  ethereum: any;
}

const useWeb3Provider = () => {
  const router = useRouter();

  const initialWeb3State = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
    contract: null,
    ethereum: undefined,
  };
  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    const { ethereum } = window;
    if (
      state.isAuthenticated ||
      typeof window === undefined ||
      window.ethereum === undefined
    )
      return;
    try {
      if (!ethereum) {
        notification.error({ message: "No tienes instalado metamask" });
      }
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const chain = Number(await (await provider.getNetwork()).chainId);
        if (chain !== 97) {
          notification.error({ message: "Cambie la red a binanceTestNet" });
          return;
        }
        setState({
          ...state,
          address: accounts[0],
          signer,
          currentChain: chain,
          provider,
          isAuthenticated: true,
          contract: new Contract(
            HousingRentalSystemContract.networks[chain].address,
            HousingRentalSystemContract.abi,
            signer
          ),
          ethereum: ethereum,
        });
        localStorage.setItem("isAuthenticated", "true");
        notification.success({
          message: "Cartera conectada con éxito en la cuenta",
          description: accounts[0],
        });
      }
    } catch {}
  }, [state]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem("isAuthenticated");
    notification.info({ message: "Cartera desconectada" });
    router.push("/");
  };

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;
