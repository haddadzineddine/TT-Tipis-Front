import axios from "../../../lib/axios"
import { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get("/products")
    return data.data as Product[];
};