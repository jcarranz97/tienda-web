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
import { FetchPostsResponse, } from "./actions";
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

    const [posts, setPosts] = useState<FetchPostsResponse | null>(null)
 
    useEffect(() => {
        const getPosts = async () => {
          const data = await fetchProducts(); // Call the external function
          if (data) {
            setPosts(data); // Set the fetched data to the state
          }
        };
    
        getPosts();
      }, []);

    if (!posts) return <div>Loading...</div>
    return (
        <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with dynamic content" isStriped>
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={posts.products}>
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
