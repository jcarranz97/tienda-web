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
    FetchInvoicesResponse,
} from "./actions";
import { RenderCell } from "./render-cell";
import { TableFooter } from "@/components/table/footer";
import { PaginationControls } from "@/components/table/pagination-controls";



const columns = [
{
    key: "id",
    label: "ID",
},
{
    key: "seller_name",
    label: "SELLER",
},
{
    key: "total_amount",
    label: "TOTAL AMOUNT",
},
{
    key: "num_products",
    label: "NUM PRODUCTS",
},
{
    key: "num_payments",
    label: "NUM PAYMENTS",
},
{
    key: "total_paid",
    label: "TOTAL PAID",
},
{
    key: "invoice_status",
    label: "INVOICE STATUS",
},
{
    key: "actions",
    label: "ACTIONS",
}
];



export const TableWrapper: React.FC<{ invoices: FetchInvoicesResponse, isLoading: boolean }> = ({ invoices, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!invoices || !invoices.invoices) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return invoices.invoices.slice(start, end);
    }, [page, rowsPerPage, invoices]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                    <PaginationControls
                        page={page}
                        numItems={invoices.num_invoices}
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
                    <TableRow key={item.id}>
                        {(columnKey) => 
                            <TableCell>
                                {RenderCell({ invoice: item, columnKey: columnKey })}
                            </TableCell>}
                        
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                numItems={invoices.num_invoices}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
