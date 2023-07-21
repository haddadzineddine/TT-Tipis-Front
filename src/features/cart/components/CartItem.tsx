
import {
    HStack, Box, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Divider, Badge, Text, Image, VStack, Button, Icon
} from '@chakra-ui/react';
import { addCurrencySymbol } from '../../../utils/helpers';
import { removeFromCart, updateProductQuantity } from '../utils/storage';
import { CartContextType } from '../types';
import { CartContext } from '../context/CartContext';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { Product } from '../../product/types';

type CartItemProps = {
    quantity: number;
    product: Product;
}

export const CartItem = (props: CartItemProps) => {

    const { setCartItems } = useContext(CartContext) as CartContextType;
    const toast = useToast();

    const changeProductQuantity = (ProductName: string, value: number) => {
        const newCart = updateProductQuantity(ProductName, value, true);
        setCartItems(newCart);
    }

    const removeProductFromCart = (ProductName: string) => {
        const newCart = removeFromCart(ProductName);
        setCartItems(newCart);

        toast({
            title: 'Product removed from cart',
            description: "We've removed the product from your cart.",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        })
    }

    return (
        <Box>
            <HStack alignItems='start' h='44' w='full' justifyContent='space-between' p={4} >
                <HStack alignItems='start' gap={6} h='full'>
                    <Box>
                        <Image height="36" width="120px" src={props.product.image} alt="Product Image" />
                    </Box>
                    <VStack alignItems='start'>
                        <Text fontWeight='bold' fontSize='xl'>{props.product.name}</Text>
                        <Badge colorScheme='blue'>{props.product.category}</Badge>
                        <Text>{addCurrencySymbol(props.product.price)}</Text>
                        <Badge colorScheme={props.quantity > 0 ? 'green' : 'red'}>{props.product.quantity} left</Badge>
                    </VStack>
                </HStack>

                <VStack alignItems='end' gap={6} h='full' justifyContent='space-between'>
                    <Button bg='transparent' borderRadius='16px' p={2} onClick={() => removeProductFromCart(props.product.name)} _hover={{ bg: 'transparent' }}>
                        <Icon as={AiOutlineClose} w={4} h={4} />
                    </Button>

                    <NumberInput
                        defaultValue={props.quantity}
                        onChange={(value) => changeProductQuantity(props.product.name, +value)}
                        min={1}
                    >
                        <NumberInputField w={20} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>


                </VStack>
            </HStack>

            <Divider />
        </Box >
    );
}