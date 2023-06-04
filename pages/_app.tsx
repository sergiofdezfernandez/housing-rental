import { AppProps } from "next/app";
import Web3ContextProvider from "../components/web3/Web3Context";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </Web3ContextProvider>
  );
}

export default App;