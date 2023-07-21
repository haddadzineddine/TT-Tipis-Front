import { Product } from "../../product/types";

export type Cart = {
    id: number;
    customerName: string;
    customerEmail: string;
    totalPrice: number;
    status: 'pending' | 'done';
    orderDate: string;
    updatedAt: string;
    items: CartItem[];
}

export type CartItem = {
    quantity: number;
    product: Product;
};


export type CartContextType = {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
};