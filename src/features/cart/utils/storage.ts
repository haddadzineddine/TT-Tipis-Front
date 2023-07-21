import { Product } from "../../product/types";
import { CartItem } from "../types";
import storage from "../../../utils/storage";



export const isProductInCart = (cartItems: CartItem[], productName: string) => {
    return cartItems.some((item) => item.product.name === productName);
};

export const getCartItems = (): CartItem[] => {
    const items: CartItem[] = storage.get("cart");
    return items || [];
};

export const updateProductQuantity = (productName: string, quantity: number, update: boolean = false) => {
    const items: CartItem[] = getCartItems();

    const updatedItems = items.map((item) => {
        if (item.product.name === productName) {
            return { ...item, quantity: update ? quantity : item.quantity + quantity };
        }
        return item;
    });

    storage.set("cart", updatedItems);

    return updatedItems;
};

export const addToCart = (product: Product, quantityToAdd: number) => {

    let cartItems = getCartItems();

    if (isProductInCart(cartItems, product.name)) {
        cartItems = updateProductQuantity(product.name, quantityToAdd);
    } else {
        cartItems.push({
            quantity: quantityToAdd,
            product
        });
    }

    storage.set('cart', cartItems);

    return cartItems;

};

export const removeFromCart = (productName: string) => {
    const items = getCartItems();
    const updatedItems = items.filter((item) => item.product.name !== productName);
    storage.set("cart", updatedItems);
    return updatedItems;
}