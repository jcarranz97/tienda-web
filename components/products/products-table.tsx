import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination,
    Spinner,
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
    label: "SHIPPING GROUP",
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


// New component for the table footer
interface TableFooterProps {
    numProducts: number;
    rowsPerPage: number;
    setRowsPerPage: (value: number) => void;
    setPage: (value: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({ numProducts, rowsPerPage, setRowsPerPage, setPage}) => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {numProducts} products</span>
            <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                    className="bg-transparent outline-none text-default-400 text-small"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setPage(1); // Reset the page to 1 when changing the rows per page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </div>
    );
};

// New component for pagination controls
interface PaginationControlsProps {
    page: number;
    pages: number;
    setPage: (page: number) => void;
    loading: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, pages, setPage, loading }) => (
    // When loading, don't show the pagination controls
    // and return null instead
    loading ? null : (
        <div className="flex w-full justify-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
            />
        </div>
    )
);

const calculatePages = (totalItems: number, rowsPerPage: number): number => {
    const pages = Math.ceil(totalItems / rowsPerPage);
    return pages > 0 ? pages : 1; // Ensure pages is always at least 1
};



export const TableWrapper: React.FC<{ products: FetchProductsResponse, isLoading: boolean }> = ({ products, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page

    // Live calculation of the number of pages
    const pages = calculatePages(products.num_products, rowsPerPage);
    
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!products || !products.products) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return products.products.slice(start, end);
    }, [page, rowsPerPage, products]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                    <PaginationControls
                        page={page}
                        pages={pages}
                        setPage={setPage}
                        loading={isLoading}
                    />
                }
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={items}
                    loadingContent={<Spinner />}
                    isLoading={isLoading}
                    >
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
            <TableFooter
                numProducts={products.num_products}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
