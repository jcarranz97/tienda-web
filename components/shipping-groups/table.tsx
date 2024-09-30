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
    FetchShippingGroupsResponse,
} from "./actions";
import { RenderCell } from "./render-cell";
import { TableFooter } from "@/components/table/footer";
import { PaginationControls } from "@/components/table/pagination-controls";



const columns = [
{
    key: "name",
    label: "NAME",
},
{
    key: "shipper",
    label: "SHIPPER",
},
{
    key: "status",
    label: "STATUS",
},
{
    key: "shipping_cost",
    label: "SHIPPING COST",
},
{
    key: "dollar_price",
    label: "DOLLAR PRICE",
},
{
    key: "num_products",
    label: "NUM PRODUCTS",
},
{
    key: "total_purchase_price",
    label: "TOTAL PURCHASE PRICE",
}
];



export const TableWrapper: React.FC<{ shippingGroups: FetchShippingGroupsResponse, isLoading: boolean }> = ({ shippingGroups, isLoading}) => {
    
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!shippingGroups || !shippingGroups.groups) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return shippingGroups.groups.slice(start, end);
    }, [page, rowsPerPage, shippingGroups]);

    return (
        <div className=" w-full flex flex-col gap-4">
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={
                    <PaginationControls
                        page={page}
                        numItems={shippingGroups.num_groups}
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
                                {RenderCell({ shippingGroup: item, columnKey: columnKey })}
                            </TableCell>}
                        
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                numItems={shippingGroups.num_groups}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setPage={setPage}
            />
        </div>
    );
};
