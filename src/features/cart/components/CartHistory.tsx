import { Layout } from "../../../Layout";
import {
    Box, HStack, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge, Spinner, Text
} from '@chakra-ui/react';

import { useEffect, useState } from "react";
import { getOrders } from "../api/getOrders";
import { Cart } from "../types";
import { addCurrencySymbol } from "../../../utils/helpers";

export const CartHistory = () => {

    const [orders, setOrders] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getOrdersHistory = async () => {
            const orders = await getOrders();
            setOrders(orders);
            setIsLoading(false);
        };

        getOrdersHistory();
    }, []);


    return (
        <Layout>
            {
                isLoading ? <Spinner mt={"16"} /> :
                    orders.length > 0 ? <HStack mt={"16"} w='full' justifyContent={'center'} alignItems={'self-start'} gap={12} >
                        <Box w='full' >
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>customerName</Th>
                                            <Th>customerEmail</Th>
                                            <Th>totalPrice</Th>
                                            <Th>status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            orders.map((order) => (
                                                <Tr key={order.id}>
                                                    <Td fontWeight='bold'>{order.id}</Td>
                                                    <Td>{order.customerName}</Td>
                                                    <Td>{order.customerEmail}</Td>
                                                    <Td>{addCurrencySymbol(order.totalPrice)}</Td>
                                                    <Td><Badge colorScheme={order.status === 'pending' ? 'yellow' : 'green'}>{order.status}</Badge></Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </HStack> : <Text mt={"16"}>No orders yet</Text>
            }

        </Layout>
    )
}