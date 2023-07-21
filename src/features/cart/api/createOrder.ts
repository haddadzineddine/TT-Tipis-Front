import axios from "../../../lib/axios";
import storage from "../../../utils/storage";
import { CartItem } from "../types";

export const createOrder = async () => {

    const cartItems: CartItem[] = storage.get('cart');

    const data = {
        customerName: "John Doe",
        customerEmail: "Joe@esi.dz",
        items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
        }))
    };

    let message = 'We have received your order. We will contact you as soon as possible.';
    let status: "success" | "error" = 'success';

    try {
        await axios.post('/orders', data);
        storage.remove('cart');
    } catch (error: any) {
        message = error.response.data.message;
        status = 'error';
    }

    return { message, status };
}