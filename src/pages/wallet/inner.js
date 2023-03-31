import Blockies from "react-blockies-image";
import { signIn, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { HStack, Link, Text, VStack, Alert, AlertIcon } from "@chakra-ui/react";

export default function WalletInner({
  handle,
  session,
  wallet,
  canClaim,
  onSend,
}) {
  return (
    <>
      <VStack
        w="full"
        bg="gray.50"
        borderWidth="1px"
        borderRadius="md"
        borderColor="gray.200"
        p={6}
        alignItems="flex-start"
      >
        <HStack spacing={4} alignItems="center">
          <Blockies width={50} height={50} seed={wallet?.address} scale={8} />
          <VStack align="flex-start">
            <Text fontSize="xl" fontWeight="bold">
              Crypto Address
            </Text>
            <Text
              fontSize="md"
              textAlign="left"
              style={{ wordBreak: "break-word" }}
            >
              {wallet?.address}
            </Text>
          </VStack>
        </HStack>
        <Text fontSize="xl" fontWeight="bold">
          Funds: ${wallet?.balance}
        </Text>
      </VStack>
      {session?.status === "authenticated" && !canClaim && (
        <Alert
          status="warning"
          bg="yellow.50"
          color="yellow.900"
          borderRadius="md"
          py={4}
          px={6}
          my={4}
          mx={{ base: 4, md: 20 }}
        >
          <AlertIcon />
          <VStack align="start">
            <Text textAlign="left">
              You&apos;re authenticated as{" "}
              <Text as="span" fontWeight="bold">
                @{session?.data?.handle}
              </Text>
              , so you are not allowed to claim{" "}
              <Text as="span" fontWeight="bold">
                @{handle}
              </Text>
              {`'s funds.`}
            </Text>
            <Text textAlign="left">
              To be able to claim, please{" "}
              <Link onClick={signOut} fontWeight="bold">
                sign out
              </Link>{" "}
              and authenticate with{" "}
              <Text as="span" fontWeight="bold">
                @{handle}
              </Text>
              .
            </Text>
          </VStack>
        </Alert>
      )}
      <HStack>
        <Button
          // type="button"
          colorScheme="blue"
          bg="#1DA1F2"
          _hover={{ bg: "blue.300", color: "white" }}
          onClick={onSend}
        >
          Send
        </Button>
        <Button
          type="button"
          onClick={signIn}
          disabled={session?.status === "authenticated" && !canClaim}
        >
          Claim with Twitter
        </Button>
      </HStack>
    </>
  );
}
