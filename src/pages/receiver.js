import { Button } from '@chakra-ui/react'

export default function Sender() {
    return (
        <Button
            type="button"
            mt={4}
            colorScheme="blue"
            bg="#1DA1F2"
            _hover={{ bg: 'blue.300', color: 'white' }}
        >Claim with Twitter</Button>
    )
}
