import axios from "../../../lib/axios"
import { Cart } from "../types";



export const getOrders = async (): Promise<Cart[]> => {
    const { data } = await axios.get("/orders");
    return data.data as Cart[];
}