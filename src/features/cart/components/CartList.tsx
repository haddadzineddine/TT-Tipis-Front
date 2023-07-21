import { CartContextType, CartItem as CartItemType } from "../types";
import {
    Box, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button, Spinner, VStack, Text, Divider, HStack
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { CartItem } from "./CartItem";
import { getCartItems } from "../helpers";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/createOrder";
import { useToast } from '@chakra-ui/react';
import { getProducts } from "../../product/api/getProducts";
import { ProductContextType } from "../../product/types";
import { ProductContext } from "../../product/context/ProductContext";
import { addCurrencySymbol } from "../../../utils/helpers";


type CartListProps = {
    btnRef: React.MutableRefObject<undefined>
    isOpen: boolean
    onClose: () => void
}

export const CartList = (drawer: CartListProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { cartItems, setCartItems } = useContext(CartContext) as CartContextType;
    const { setProducts } = useContext(ProductContext) as ProductContextType;

    const toast = useToast();

    const ProcessCheckout = async () => {
        const { status, message } = await createOrder();

        if (status === 'success') {
            setCartItems([]);
        }

        const newProducts = await getProducts();
        setProducts(newProducts);

        toast({
            title: status,
            description: message,
            status,
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        });

    }

    useEffect(() => {
        setIsLoading(true);
        const getCartItemsFromStorage = async () => {
            const cartItems: CartItemType[] = await getCartItems();
            setCartItems(cartItems);
            setIsLoading(false);
        }

        getCartItemsFromStorage();

    }, []);

    return (
        <Box>
            <Drawer
                size='md'
                isOpen={drawer.isOpen}
                placement='right'
                onClose={drawer.onClose}
                finalFocusRef={drawer.btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Cart Items</DrawerHeader>

                    <DrawerBody>
                        {
                            isLoading ? <Spinner /> :
                                cartItems.length > 0 ? cartItems.map((cartItem) => {
                                    return (
                                        <CartItem key={cartItem.product.name}
                                            product={cartItem.product}
                                            quantity={cartItem.quantity} />
                                    )

                                }) : <Box>Cart is empty</Box>
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <VStack w='full' gap={8}>
                            <Divider />
                            <HStack gap={6}>
                                <Text fontSize='2xl' fontWeight='bold'>Total:</Text>
                                <Text fontSize='2xl'>
                                    {addCurrencySymbol(cartItems.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.quantity, 0))}
                                </Text>
                            </HStack>

                            <Button onClick={ProcessCheckout}
                                isDisabled={cartItems.length === 0}
                                w='full' colorScheme='blue'>Proceed to checkout</Button>
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


        </Box>
    );
}