import React, { useState } from "react";
import Image from "next/image";
import {
  HStack,
  Link,
  Text,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  useToast,
} from "@chakra-ui/react";
import twitter from "../assets/twitter-logo.svg";
import useResolveWallet from "../hooks/useResolveWallet";
import { useRouter } from "next/router";
import logo from "../assets/logo.svg";
import Button from "@/components/Button";

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const { handleResolveWallet, inProgress } = useResolveWallet();
  const [handle, setHandle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Check if the Twitter handle is valid and make the API call
    // If not found, show an error toast
    // toast({
    //   title: "Error",
    //   description: "Twitter handle not found.",
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    // });

    try {
      const res = await handleResolveWallet({
        socialHandle: handle,
        socialHandleType: "twitter",
      });

      if (!res) {
        return toast({
          title: "Failed to resolve wallet.",
          description: `Bad Twitter handle?`,
          status: "error",
          duration: 2500,
          isClosable: false,
        });
      }

      toast({
        title: "Success",
        description: `Resolved to wallet: ${res.address}`,
        status: "success",
        duration: 2500,
        isClosable: false,
      });

      router.push("/wallet");
    } catch (e) {
      toast({
        title: "Failed to resolve wallet.",
        description: `Either our server, or your connection is problematic. Try again later.`,
        status: "error",
        duration: 2500,
        isClosable: false,
      });
    }
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

      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <InputGroup size="lg">
            <InputLeftAddon size="lg" p={1} borderLeftRadius="20">
              <Image src={twitter} width="40" height="40" alt="Twitter logo" />
            </InputLeftAddon>
            <Input
              id="twitterHandle"
              type="text"
              size="lg"
              borderWidth="1px"
              borderColor="gray.200"
              bg="#F0F0F0"
              borderRadius="10"
              focusBorderColor="blue.500"
              disabled={inProgress}
              onChange={(event) => setHandle(event.currentTarget.value)}
            />
          </InputGroup>
          <Button type="submit" disabled={inProgress}>
            {inProgress ? "Looking up..." : "Look up wallet"}
          </Button>
        </FormControl>
      </form>
    </>
  );
}
