import { AppProps } from "next/app";
import Web3ContextProvider from "../components/web3/Web3Context";
import "../styles/globals.css";
import AppLayout from "../components/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Web3ContextProvider>
  );
}

export default App;
