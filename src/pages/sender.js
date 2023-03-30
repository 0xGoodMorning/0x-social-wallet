import Image from "next/image";
import React from "react";
import {
  Text,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import twitter from "../assets/twitter-logo.svg";
import useResolveWallet from '../hooks/useResolveWallet'
import delayPromise from "../lib/delayPromise"

export default function Sender() { 
  const toast = useToast();
  const { handleResolveWallet } = useResolveWallet()

  const handleSubmit = async (e) => {
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

    const res = await handleResolveWallet({ socialHandle: e.target.value, socialHandleType: 'twitter' })

    !!res && toast({
      title: "Success",
      description: `Resolved to wallet: ${res.address}`,
      status: "success",
      duration: 2500,
      isClosable: false,
    });

    delayPromise(2500)

    // TODO: nav to the next screen
  };

    return (
        <>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputGroup size="lg">
                <InputLeftAddon size="lg" p={1} borderLeftRadius="20">
                  <Image
                    src={twitter}
                    width="40"
                    height="40"
                    alt="Twitter logo"
                  />
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
                />
              </InputGroup>
              <Button
                type="submit"
                mt={4}
                colorScheme="blue"
                bg="#1DA1F2"
                _hover={{ bg: "blue.300", color: "white" }}
              >
                Look up wallet
              </Button>
            </FormControl>
          </form>
        </>
    )
}