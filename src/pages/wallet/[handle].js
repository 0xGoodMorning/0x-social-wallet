import { useState, useEffect } from "react";
import { useSession} from "next-auth/react";
import { useRouter } from 'next/router'

import {
  HStack,
  Button,
  Link,
  Text,
  Image,
  VStack, useToast, Spinner,
} from "@chakra-ui/react";
import useResolveWallet from "@/hooks/useResolveWallet";
import WalletInner from "@/pages/wallet/inner";

export default function WalletWrapper() {
  const router = useRouter()
  const session = useSession()
  const toast = useToast()
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

  return (
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

        { wallet?.address && <WalletInner handle={handle} session={session} wallet={wallet} canClaim={canClaim} /> }
      </VStack>

    </VStack>
  );
}
