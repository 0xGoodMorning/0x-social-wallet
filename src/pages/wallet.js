import Blockies from "react-blockies-image";
import useAccount from "@/hooks/useAccount";
import {
  HStack,
  Button,
  Link,
  Text,
  Image,
  useToast,
  VStack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from "@chakra-ui/react";
import { CopyIcon } from '@chakra-ui/icons'
import QRCode from "react-qr-code";

export default function Wallet() {
  const { account, isAccountEmpty } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  console.log(account, isAccountEmpty)

  return (
    <>
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
            onClick={onOpen}
            isDisabled={isAccountEmpty}
          >
            Send
          </Button>
          <Button
            type="button"
            colorScheme="blue"
            bg="#1DA1F2"
            _hover={{ bg: "blue.300", color: "white" }}
            isDisabled={isAccountEmpty}
          >
            Claim with Twitter
          </Button>
        </HStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
        <ModalOverlay />
          <ModalContent padding={16}>
            <ModalCloseButton />
            <Text align="center" marginBottom="10" fontSize="2xl" fontWeight="semibold">{`Send to ${account.name}'s address`}</Text>
            <VStack align="center">
              <QRCode
                size={256}
                style={{ marginBottom: 10 }}
                value={account.address || ''}
                viewBox={`0 0 256 256`}
              />
              <HStack
                marginBottom={10}         
                _hover={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(account.address)
                    toast({
                      title: "Success",
                      description: `Address copied to clipboard`,
                      status: "success",
                      duration: 1200,
                      isClosable: false,
                    });
                  }}
                >
                <Text fontSize="sm" noOfLines={1}>{account.address}</Text>
                <CopyIcon />
              </HStack>
            </VStack>
          </ModalContent>
      </Modal>
    </>
  );
}
