import { getProducts } from '../api/getProducts';
import { useEffect, useState } from 'react';
import { Text, Grid, GridItem, Box, Spinner, VStack } from '@chakra-ui/react';
import { Product } from './Product';
import { ProductContextType } from '../types';
import { ProductContext } from '../context/ProductContext';
import { useContext } from 'react';



export const ProductList = () => {

    const { products, setProducts } = useContext(ProductContext) as ProductContextType;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        isLoading ? (
            <VStack p={16} >
                <Spinner />
            </VStack>
        ) : products.length > 0 ? (
            <Box>
                <Text py={8}>{products.length} Product(s) found</Text>
                <Grid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={6} >
                    {
                        products.map((product) => (
                            <GridItem key={product.id} h='full'>
                                <Product
                                    key={product.id}
                                    id={+product.id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    quantity={product.quantity}
                                    image={product.image}
                                    category={product.category}
                                />
                            </GridItem>
                        ))
                    }
                </Grid>
            </Box>
        ) : (
            <Text>No products</Text>
        )


    );
}