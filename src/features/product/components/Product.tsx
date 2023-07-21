import {
    Box, VStack, Text, Button, Image, HStack, Badge, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

import { useState, useContext } from 'react';
import { addCurrencySymbol } from '../../../utils/helpers';
import { addToCart } from '../../cart/helpers';
import { CartContext } from '../../cart/context/CartContext';
import { CartContextType } from '../../cart/types';

type ProductProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
}

export const Product = (props: ProductProps) => {

    const toast = useToast();
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    const { setCartItems } = useContext(CartContext) as CartContextType;


    const addProductToCart = async () => {
        const newCartItem = addToCart(props, quantityToAdd);
        setCartItems(newCartItem);
        setQuantityToAdd(1);

        toast({
            title: 'Product added to cart',
            description: "We've added the product to your cart.",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        })
    };

    return (
        <Box h="full" w="300px" borderRadius={12}>
            <VStack justifyContent='space-between' h='full' >
                <Box h="300" w="full">
                    <Image h="inherit" w="full" fit='cover' src={props.image} alt="Product Image" />
                </Box>

                <VStack w='full' alignItems='start' gap={2}>
                    <HStack justifyContent="space-between" mb={3} w='full'>
                        <Text fontWeight='bold' fontSize='xl'>{props.name}</Text>
                        <Badge colorScheme='messenger'>{props.category}</Badge>
                    </HStack>
                    <Text>{props.description}</Text>
                </VStack>

                <VStack w='full' alignItems='start'>
                    <HStack justifyContent='space-between' w='full' alignItems='start'>
                        <Box>
                            <Text fontWeight='bold' fontSize='2xl'>{addCurrencySymbol(props.price)}</Text>
                            <Badge colorScheme={props.quantity > 0 ? 'green' : 'red'}>{props.quantity} left</Badge>
                        </Box>
                        <Box>
                            {
                                props.quantity !== 0 ? (<NumberInput
                                    value={quantityToAdd}
                                    onChange={(value) => setQuantityToAdd(+value)}
                                    min={1}
                                    max={props.quantity}>
                                    <NumberInputField w={20} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>) : null
                            }

                        </Box>
                    </HStack>
                    <Box w='full' mt={4}>
                        <Button isDisabled={props.quantity === 0} color={'whiteAlpha.900'} bg='blackAlpha.800' _hover={{ bg: 'yellow.500' }} w='full'
                            onClick={addProductToCart}
                        >Add to cart</Button>
                    </Box>
                </VStack>

            </VStack>
        </Box >
    );
}