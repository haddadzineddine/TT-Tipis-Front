import { ProductList } from "./features/product/components/ProductList";
import { Box, HStack } from '@chakra-ui/react';

import { Layout } from "./Layout";

export const App = () => {

  return (
    <Layout>
      <HStack w='full' justifyContent={'center'} alignItems={'self-start'} gap={12}>
        <Box w='full' >
          <ProductList />
        </Box>
      </HStack>
    </Layout>
  );
}

