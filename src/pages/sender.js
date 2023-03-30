import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

export default function Sender() { 
    const toast = useToast();

    const [receiverAdr, setReceiverAddr] = useState('')

    useEffect(() => {
        async function getData() {
        const res = await (await fetch('/api/create-receiver')).json()
        setReceiverAddr(res.receiver_address)
        }

        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Check if the Twitter handle is valid and make the API call
        // If not found, show an error toast
        toast({
        title: "Error",
        description: "Twitter handle not found.",
        status: "error",
        duration: 5000,
        isClosable: true,
        });
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
                  Get instructions
                </Button>
              </FormControl>
            </form>
            <Text>
              {receiverAdr}
            </Text>
        </>
    )
}