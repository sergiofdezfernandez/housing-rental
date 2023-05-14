import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Web3ContextProvider from "../components/web3/Web3Context";
import Header from "../components/parts/header";
import Footer from "../components/parts/footer";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3ContextProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}

export default App;
