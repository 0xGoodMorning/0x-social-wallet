import { signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import logo from "@/assets/logo.svg";
import twitter from "../assets/twitter-logo.svg";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>0x Social Wallet</title>
        <meta
          name="description"
          content="Send/Recieve crypto assets with social accounts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack
        minH="100vh"
        justifyContent="space-between"
        bgGradient="radial-gradient(circle at center, #E0E0E0, #C7C7C7)"
        color="#111111"
      >
        <Box
          as="header"
          py={8}
          px={{ base: 4, xl: 20 }}
          w="full"
          maxWidth={{ base: "90%", md: "unset" }}
        >
          {session.status === "authenticated" && (
            <HStack justify="space-between">
              <HStack spacing={4}>
                <Link href="/">
                  <Image src={logo} width="50" height="50" alt="Logo" />
                </Link>
                <Link href="/">
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    display={{ base: "none", md: "inline" }}
                  >
                    0xSocialWallet
                  </Text>
                </Link>
              </HStack>
              <HStack>
                <VStack align="flex-end">
                  <HStack>
                    <Text
                      fontWeight="bold"
                      color="#1DA1F4"
                      marginInlineStart="0"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      @{session.data.handle}
                    </Text>
                  </HStack>
                  <Button
                    variant="link"
                    marginTop="0 !important"
                    onClick={signOut}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Logout
                  </Button>
                </VStack>
                <Box position="relative">
                  <Box
                    borderRadius="full"
                    overflow="hidden"
                    width="50px"
                    height="50px"
                  >
                    <Image
                      src={session.data.user.image}
                      alt="Twitter profile picture"
                      width="50"
                      height="50"
                      boxSize="50px"
                    />
                  </Box>
                  <Box
                    position="absolute"
                    bottom="-10px"
                    right="-10px"
                    bg="#1DA1F4"
                    borderRadius="full"
                    p="1"
                  >
                    <Image
                      src={twitter}
                      width="20"
                      height="20"
                      alt="Twitter logo"
                    />
                  </Box>
                </Box>
              </HStack>
            </HStack>
          )}
        </Box>

        <VStack
          as="main"
          spacing={6}
          maxWidth={{ base: "90%", md: "400px" }}
          textAlign="center"
        >
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
  );
};

export default Layout;
