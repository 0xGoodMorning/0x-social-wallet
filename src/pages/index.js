import React from "react";
import Image from "next/image";
import {
  Text,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import twitter from "../assets/twitter-logo.svg";
import { useRouter } from "next/router";
import logo from "../assets/logo.svg";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const socialHandle = e.target.socialHandle.value
    if (socialHandle === '') return
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
            />
          </InputGroup>
          <Button type="submit">
            Look up wallet
          </Button>
        </FormControl>
      </form>
    </>
  );
}
