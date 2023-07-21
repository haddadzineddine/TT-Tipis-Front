import { HStack, VStack, Center, Text, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';

import { useColorMode, useDisclosure } from '@chakra-ui/react';

import { AiOutlineShoppingCart, AiFillHome } from 'react-icons/ai';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { CartList } from "./features/cart/components/CartList";
import { CartItem } from "./features/cart/types";

import { useState, useRef } from 'react';
import { CartContext } from "./features/cart/context/CartContext";
import { ProductContext } from "./features/product/context/ProductContext";
import { AiOutlineHistory } from "react-icons/ai";
import { Product } from "./features/product/types";

import { useNavigate } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            <CartContext.Provider value={{ cartItems, setCartItems }}>
                <Center>
                    <VStack my={12} w={{ base: '100%', md: '60%' }} p={{ base: 2, md: 0 }} >
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                <Text fontWeight={'bold'} fontSize={'2xl'}>Tipis x Test Technique</Text>
                                <Button bg='transparent' borderRadius='16px' p={2} onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <Icon as={BsFillSunFill} w={6} h={6} /> : <Icon as={BsFillMoonFill} w={8} h={8} />}
                                </Button>
                            </HStack>
                            <HStack>

                                <Button bg='transparent' borderRadius='16px' p={2} onClick={() => navigate('/')}>
                                    <Icon as={AiFillHome} w={8} h={8} />
                                </Button>

                                <Button bg='transparent' borderRadius='16px' p={2} onClick={() => navigate('/cart-history')}>
                                    <Icon as={AiOutlineHistory} w={8} h={8} />
                                </Button>

                                <Button bg='transparent' borderRadius='16px' p={2} ref={btnRef} onClick={onOpen}>
                                    <Icon as={AiOutlineShoppingCart} w={8} h={8} />
                                </Button>
                            </HStack>
                        </HStack>

                        {children}

                        <CartList
                            btnRef={btnRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        />

                    </VStack>
                </Center>
            </CartContext.Provider >
        </ProductContext.Provider>
    );
}

