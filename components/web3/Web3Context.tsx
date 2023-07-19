import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import useWeb3Provider, { IWeb3State } from "../../hooks/useWeb3Provider";
import { notification } from "antd";

export interface IWeb3Context {
  connectWallet: () => Promise<any>;
  disconnect: () => void;
  state: IWeb3State;
}

const Web3Context = createContext<IWeb3Context | null>(null);

type Props = {
  children: ReactNode;
};

const Web3ContextProvider: FC<Props> = ({ children }) => {
  const { connectWallet, disconnect, state } = useWeb3Provider();

  useEffect(() => {
    state.ethereum?.on("accountsChanged", handleAccountChanged);
    return () => {
      state.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });
  function handleAccountChanged(accounts: any) {
    if (accounts.length === 0) {
      notification.info({ message: "Por favor conecta con MetaMask" });
    } else if (accounts[0] !== state.address) {
      notification.success({
        message: "La cuenta de la cartera ha sido cambiada",
        description: accounts[0],
      });
      state.address = accounts[0];
    }
  }
  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnect,
        state,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;

export const useWeb3Context = () => useContext(Web3Context);
