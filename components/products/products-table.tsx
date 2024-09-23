import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    dataFocusVisibleClasses,
    getKeyValue,
} from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from 'react';
import useSWR from "swr";

  
const rows = [
{
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
},
{
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
},
{
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
},
{
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
},
];

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
];



export const TableWrapper = () => {
    const [posts, setPosts] = useState(null)
 
    useEffect(() => {
      async function fetchPosts() {
        let res = await fetch('http://localhost:8000/articles/get-articles')
        let data = await res.json()
        console.log(data)
        setPosts(data)
      }
      fetchPosts()
    }, [])

    if (!posts) return <div>Loading...</div>
    return (
        <div className=" w-full flex flex-col gap-4">
        <Table aria-label="Example table with dynamic content" isStriped>
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={posts.articles}>
                {(item) => (
                <TableRow key={item.id_article}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
        </div>
    );
};
