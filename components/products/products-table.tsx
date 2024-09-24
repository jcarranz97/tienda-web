import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from 'react';
import { fetchProducts } from "./actions";
import { FetchProductsResponse, } from "./actions";
import { RenderCell } from "./render-cell";



const columns = [
{
    key: "shipping_label",
    label: "NAME",
},
{
    key: "shipping_group",
    label: "ROLE",
},
{
    key: "status",
    label: "STATUS",
},
{
    key: "purchase_price",
    label: "PURCHASE PRICE",
},
{
    key: "sale_price",
    label: "SALE PRICE",
},
];


export const TableWrapper = () => {

    const [products, setProducts] = useState<FetchProductsResponse | null>(null)
 
    useEffect(() => {
        const getProducts = async () => {
          const data = await fetchProducts(); // Call the external function
          if (data) {
            setProducts(data); // Set the fetched data to the state
          }
        };
    
        getProducts();
      }, []);

    if (!products) return <div>Loading...</div>
    return (
        <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with dynamic content" isStriped>
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={products.products}>
                {(item) => (
                <TableRow key={item.id_product}>
                    {(columnKey) => 
                        <TableCell>
                            {RenderCell({ product: item, columnKey: columnKey })}
                        </TableCell>}
                    
                </TableRow>
                )}
            </TableBody>
        </Table>
        </div>
    );
};
