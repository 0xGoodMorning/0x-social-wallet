import Blockies from "react-blockies-image";
import useAccount from "@/hooks/useAccount";
import {
  HStack,
  Button,
  Link,
  Text,
  Image,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function Wallet() {
  const { account } = useAccount();
  return (
    <VStack spacing={4} align="center">
      <HStack spacing={4} alignItems="center" mb="2">
        <Image
          src="https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg"
          boxSize="100px"
          borderRadius="full"
          alt="Twitter image"
        />
        <VStack align="flex-start">
          <Text fontSize="2xl" fontWeight="bold">
            {account.name}
          </Text>
          <Text fontSize="l">
            Twitter handle: <Link>@{account.handle}</Link>
          </Text>
        </VStack>
      </HStack>
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
          <Blockies width={50} height={50} seed={account.address} scale={8} />
          <VStack align="flex-start">
            <Text fontSize="xl" fontWeight="bold">
              Crypto Address
            </Text>
            <Text fontSize="md">{account.address}</Text>
          </VStack>
        </HStack>
        <Text fontSize="xl" fontWeight="bold">
          Funds: ${account.balance}
        </Text>
      </VStack>
      <HStack>
        <Button
          type="button"
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
        >
          Claim with Twitter
        </Button>
      </HStack>
    </VStack>
  );
}
