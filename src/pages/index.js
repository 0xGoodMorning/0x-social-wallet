import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  HStack,
  Button,
  Link,
  Text,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import twitter from "../assets/twitter-logo.svg";
import useResolveWallet from "../hooks/useResolveWallet";
import delayPromise from "../lib/delayPromise";
import { useRouter } from "next/router";
import logo from "../assets/logo.svg";

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const { handleResolveWallet, inProgress } = useResolveWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const socialHandle = e.target.socialHandle.value
    router.push(`/wallet/${socialHandle}`);
  };

  return (
    <>
      <Image src={logo} width="100" height="100" alt="Logo" />
      <Text fontSize="4xl">0xSocialWallet</Text>
      <Text fontSize="2xl">True non-custodial social wallet!</Text>
      <Text>
        Secure, decentralized solution that seamlessly connects social media
        accounts to the world of Web3. Send anyone crypto by inputting their
        Twitter handle.
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup size="lg">
            <InputLeftAddon size="lg" p={1} borderLeftRadius="20">
              <Image src={twitter} width="40" height="40" alt="Twitter logo" />
            </InputLeftAddon>
            <Input
              name="socialHandle"
              type="text"
              size="lg"
              borderWidth="1px"
              borderColor="gray.200"
              bg="#F0F0F0"
              borderRadius="10"
              focusBorderColor="blue.500"
              disabled={inProgress}
            />
          </InputGroup>
          <Button
            type="submit"
            mt={4}
            colorScheme="blue"
            bg="#1DA1F2"
            _hover={{ bg: "blue.300", color: "white" }}
            disabled={inProgress}
          >
            {inProgress ? "Looking up..." : "Look up wallet"}
          </Button>
        </FormControl>
      </form>
    </>
  );
}
