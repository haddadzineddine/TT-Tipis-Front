import axios from "../../../lib/axios"
import { getProducts } from "./getProducts";

export const decreseQuantity = async (productId: number, quantity: number) => {
    await axios.post(`/stocks/decrease-product-quantity`, { productId, quantity })

    return await getProducts();
};

export const increseQuantity = async (productId: number, quantity: number) => {
    await axios.post(`/stocks/increase-product-quantity`, { productId, quantity })

    return await getProducts();
}