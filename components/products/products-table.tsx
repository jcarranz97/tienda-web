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
import { FetchProductsResponse, } from "./actions";
import { RenderCell } from "./render-cell";
import { TableFooter } from "@/components/table/footer";
import { PaginationControls } from "@/components/table/pagination-controls";



const columns = [
{
    key: "shipping_label",
    label: "SHIPPING LABEL",
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
    key: "shipping_cost",
    label: "SHIPPING COST",
},
{
    key: "purchase_price_mxn",
    label: "PURCHASE PRICE",
},
{
    key: "sale_price",
    label: "SALE PRICE",
},
{
    key: "mx_iva",
    label: "IVA",
},
{
    key: "profit",
    label: "PROFIT",
},
{
    key: "profit_percentage",
    label: "PROFIT %",
}
];


export const TableWrapper: React.FC<{ products: FetchProductsResponse, isLoading: boolean }> = ({ products, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    
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
                        numItems={products.num_products}
                        rowsPerPage={rowsPerPage}
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
                numItems={products.num_products}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
