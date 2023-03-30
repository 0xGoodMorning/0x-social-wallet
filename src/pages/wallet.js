import Blockies from "react-blockies-image";
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
            Sam Altman
          </Text>
          <Text fontSize="l">
            Twitter handle: <Link>@sama</Link>
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
          <Blockies
            width={50}
            height={50}
            seed={"0xdd2a7Dc3d038b5EA4164D41B3617aDa5eb4179bf"}
            scale={8}
          />
          <VStack align="flex-start">
            <Text fontSize="xl" fontWeight="bold">
              Crypto Address
            </Text>
            <Text fontSize="md">
              0xfA2DfB09851EeC1841FEB9f7c5D2E952151bfF0a
            </Text>
          </VStack>
        </HStack>
        <Text fontSize="xl" fontWeight="bold">
          Funds: $0
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
