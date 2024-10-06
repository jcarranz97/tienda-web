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
    FetchInvoicePaymentsResponse,
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
    key: "amount",
    label: "AMOUNT",
},
{
    key: "payment_comment",
    label: "COMMENT",
},
{
    key: "payment_date",
    label: "PAYMENT DATE",
}
];



export const InvoicePaymentsTable: React.FC<{ invoice_payments: FetchInvoicePaymentsResponse, isLoading: boolean }> = ({ invoice_payments, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!invoice_payments || !invoice_payments.payments) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return invoice_payments.payments.slice(start, end);
    }, [page, rowsPerPage, invoice_payments]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                    <PaginationControls
                        page={page}
                        numItems={invoice_payments.num_payments}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        loading={isLoading}
                    />
                }
                topContent={
                    <div>Installments</div>
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
                                {RenderCell({ invoice_payment: item, columnKey: columnKey })}
                            </TableCell>}
                        
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                numItems={invoice_payments.num_payments}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
