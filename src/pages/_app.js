import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
  );
}
