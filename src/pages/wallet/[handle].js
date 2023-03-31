import { useState, useEffect } from "react";
import { useSession} from "next-auth/react";
import { useRouter } from 'next/router'

import {
  HStack,
  Link,
  Text,
  Image,
  useToast,
  VStack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Spinner
} from "@chakra-ui/react";
import useResolveWallet from "@/hooks/useResolveWallet";
import { CopyIcon } from '@chakra-ui/icons'
import QRCode from "react-qr-code";
import WalletInner from "@/pages/wallet/inner";

export default function WalletWrapper() {
  const router = useRouter()
  const session = useSession()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleResolveWallet } = useResolveWallet()

  const [wallet, setWallet] = useState()
  const { handle } = router.query

  const canClaim = session.status === "authenticated" && session.data.handle === handle

  useEffect( () => {

    const fetchWallet = async () => {
      if (!handle) return

      const response = await handleResolveWallet({
        socialHandle: handle,
        socialHandleType: "twitter",
      });

      if (!!response) {
        toast({
          title: "Success",
          description: `Resolved to wallet: ${response.address}`,
          status: "success",
          duration: 2500,
          isClosable: false,
        });

        setWallet({
          address: response.address,
          balance: 0
        })
      } else {
        toast({
          title: "Error",
          description: `Can't resolve wallet for @${handle}`,
          status: "error",
          duration: 2500,
          isClosable: false,
        });

        setWallet({
          hasError: true
        })
      }
    }

    fetchWallet()
  }, [handle])

  return <>
    <VStack spacing={4} align="center">
      <HStack spacing={4} alignItems="center" mb="2">
        <Image
          src={canClaim ? session.data?.user.image : '/profilePic.jpg'}
          boxSize="100px"
          borderRadius="full"
          alt="Twitter image"
        />
        <VStack align="flex-start">
          <Text fontSize="2xl" fontWeight="bold">
            {canClaim && session.data?.user.name}
          </Text>
          <Text fontSize="l">
            Twitter handle: <Link href={`https://twitter.com/${handle}`} target="_blank">@{handle}</Link>
          </Text>
        </VStack>
      </HStack>

      <VStack
      >
        { !wallet?.address && !wallet?.hasError && <HStack>
          <Text>Resolving wallet address. Please wait!</Text>
          <Spinner/>
        </HStack>
        }

        { wallet?.address && <WalletInner handle={handle} session={session} wallet={wallet} canClaim={canClaim} onSend={onOpen} /> }
      </VStack>
    </VStack>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <ModalOverlay />
      <ModalContent padding={16}>
        <ModalCloseButton />
        <Text align="center" marginBottom="10" fontSize="2xl" fontWeight="semibold">{`Send to @${handle}'s address`}</Text>
        <VStack align="center">
          <QRCode
              size={256}
              style={{ marginBottom: 10 }}
              value={wallet?.address || ''}
              viewBox={`0 0 256 256`}
          />
          <HStack
              marginBottom={10}
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(wallet?.address)
                toast({
                  title: "Success",
                  description: `Address copied to clipboard`,
                  status: "success",
                  duration: 1200,
                  isClosable: false,
                });
              }}
          >
            <Text fontSize="sm" noOfLines={1}>{wallet?.address}</Text>
            <CopyIcon />
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  </>
}
