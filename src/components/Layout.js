import Head from "next/head";
import Image from "next/image";
import React from "react";
import {
  Box,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>0x Social Wallet</title>
                <meta name="description" content="Send/Recieve crypto assets with social accounts" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <VStack
                minH="100vh"
                justifyContent="space-between"
                bgGradient="radial-gradient(circle at center, #E0E0E0, #C7C7C7)"
                color="#111111"
            >
                <Box as="header" py={4}>
                    {/* TODO: Add your header content here */}
                </Box>
        
                <VStack as="main" spacing={6} maxWidth="400px" textAlign="center">
                    <Image src={logo} width="100" height="100" alt="Logo" />
                    <Text fontSize="4xl">0xSocialWallet</Text>
                    <Text fontSize="2xl">True non-custodial social wallet!</Text>
                    <Text>
                        Secure, decentralized solution that seamlessly connects social media
                        accounts to the world of Web3. Send anyone crypto by inputting their
                        Twitter handle.
                    </Text>
                    {children}
                </VStack>
        
                <Box as="footer" py={4} textAlign="center" color="gray.800">
                    <Text>
                        Made with ❤️ in Bulgaria 🇧🇬 <br />
                        Copyright ©{" "}
                        <Link href="https://github.com/0xGoodMorning" isExternal>
                            0xGoodMorning
                        </Link>
                    </Text>
                </Box>
            </VStack>
        </>
    )
}

export default Layout
