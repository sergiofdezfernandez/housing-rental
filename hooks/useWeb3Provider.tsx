import { message, notification } from "antd";
import { BrowserProvider, ethers, JsonRpcSigner, Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import HousingRentalSystemContract from "../contracts/HousingRentalSystem.json";

declare var window: any;

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
  contract: any | null;
}

const useWeb3Provider = () => {
  const initialWeb3State = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
    contract: null,
  };
  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return;
    try {
      const { ethereum } = window;

      if (!ethereum) {
        notification.error({ message: "No tienes instalado metamask" });
      }
      const provider = new ethers.BrowserProvider(ethereum);

      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const chain = Number(await (await provider.getNetwork()).chainId);
        if(chain !== 97){
          notification.error({ message: "Cambie la red a ethereum" });
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
  };

  useEffect(() => {
    if (window == null) return;

    if (localStorage.hasOwnProperty("isAuthenticated")) {
      connectWallet();
    }
  }, [connectWallet, state.isAuthenticated]);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setState({ ...state, address: accounts[0] });
    });

    window.ethereum.on("networkChanged", (network: string) => {
      setState({ ...state, currentChain: Number(network)});
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [state]);

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;
