import Blockies from "react-blockies-image";
import { signIn, signOut} from "next-auth/react";

import {
  HStack,
  Button,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function WalletInner({ handle, session, wallet }) {
  return <>
    <VStack
        w="full"
        bg="gray.50"
        borderWidth="1px"
        borderRadius="md"
        borderColor="gray.200"
        p={6}
        spacing={4}
        alignItems="flex-start"
    >
      <HStack spacing={4} alignItems="center">
        <Blockies width={50} height={50} seed={wallet?.address} scale={8} />
        <VStack align="flex-start">
          <Text fontSize="xl" fontWeight="bold">
            Crypto Address
          </Text>
          <Text fontSize="md">{wallet?.address}</Text>
        </VStack>
      </HStack>
      <Text fontSize="xl" fontWeight="bold">
        Funds: ${wallet?.balance}
      </Text>
    </VStack>
    <HStack>
      <Button
          // type="button"
          colorScheme="blue"
          bg="#1DA1F2"
          _hover={{ bg: "blue.300", color: "white" }}
      >
        Send
      </Button>
      <Button
          type="button"
          colorScheme="blue"
          bg="#1DA1F2"
          _hover={{ bg: "blue.300", color: "white" }}
          onClick={signIn}
          isDisabled={session.status === 'authenticated' && !canClaim}
      >
        Claim with Twitter
      </Button>
    </HStack>
    {session.status === 'authenticated' && !canClaim && <Alert>
      <Text>Seems you're authenticated as @{session.data.handle}, but trying to claim as @{handle}</Text>
      <Text><Link onClick={signOut}><Text as='b'>Sign out</Text></Link> and authenticate with @{handle}</Text>
    </Alert>
    }
  </>
}
