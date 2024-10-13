import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Spinner,
} from "@nextui-org/react";
import React from "react";
import {
    FetchInvoiceProductsResponse,
} from "./actions";
import { RenderCell, RenderCellInvoiceProduct} from "./render-cell";
import { TableFooter } from "@/components/table/footer";
import { PaginationControls } from "@/components/table/pagination-controls";



const columns = [
{
    key: "shipping_label",
    label: "SHIPPING LABEL",
},
{
    key: "description",
    label: "DESCRIPTION",
},
{
    key: "sale_price",
    label: "SALE PRICE",
}
];



export const InvoiceProductsTable: React.FC<{ invoice_products: FetchInvoiceProductsResponse, isLoading: boolean }> = ({ invoice_products, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!invoice_products || !invoice_products.products) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return invoice_products.products.slice(start, end);
    }, [page, rowsPerPage, invoice_products]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                    <PaginationControls
                        page={page}
                        numItems={invoice_products.num_products}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        loading={isLoading}
                    />
                }
                topContent={
                    <div>Products</div>
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
                    <TableRow key={item.id}>
                        {(columnKey) => 
                            <TableCell>
                                {RenderCellInvoiceProduct({ invoice_product: item, columnKey: columnKey })}
                            </TableCell>}
                        
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                numItems={invoice_products.num_products}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
