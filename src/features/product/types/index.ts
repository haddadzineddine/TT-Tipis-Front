
export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
};


export type ProductContextType = {
    products: Product[],
    setProducts: (products: Product[]) => void
}