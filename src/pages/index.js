import React from "react";
import {
  HStack,
  Button,
  Link
} from "@chakra-ui/react";

import NextLink from 'next/link'

export default function Home() {
 return (
    <HStack>
      <Button colorScheme='blue'>
        <Link as={NextLink} href='/sender'>
          SENDER
        </Link>
      </Button>
      <Button colorScheme='blue'>
        <Link as={NextLink} href='/receiver'>
          RECEIVER
        </Link>
      </Button>
    </HStack>
  );
}
