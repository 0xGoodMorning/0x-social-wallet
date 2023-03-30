import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { AccountProvider } from "@/contexts/accountContext";
import "@/styles/globals.css";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
        <AccountProvider>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </AccountProvider>
      </SessionProvider>
  );
}
