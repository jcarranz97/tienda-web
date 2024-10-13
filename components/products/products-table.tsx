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
import { FetchProductsResponse, } from "./actions";
import { RenderCell } from "./render-cell";
import { TableFooter } from "@/components/table/footer";
import { PaginationControls } from "@/components/table/pagination-controls";
import { SelectProduct } from "./actions";



const columns = [
{
    key: "id_product",
    label: "ID",
},
{
    key: "shipping_label",
    label: "SHIPPING LABEL",
},
{
    key: "description",
    label: "DESCRIPTION",
},
{
    key: "shipping_group",
    label: "SHIPPING GROUP",
},
{
    key: "location_name",
    label: "LOCATION",
},
{
    key: "invoice_id",
    label: "INVOICE",
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
    label: "PURCHASE PRICE (MXN)",
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
},
{
    key: "actions",
    label: "ACTIONS",
}
];

type TableWrapperProps = {
    products: FetchProductsResponse;
    isLoading: boolean;
    setSelectedProducts: (keys: Set<React.Key>) => void;
    replaceProductInState: (product: SelectProduct) => void;
};


export const TableWrapper: React.FC<TableWrapperProps> = ({ products, isLoading, setSelectedProducts, replaceProductInState}) => {  
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);  // Default rows per page
    const [disabledKeys, setDisabledKeys] = React.useState<string[]>([]);
    // Memorize the items to display
    const items = React.useMemo(() => {
        if (!products || !products.products) return [];
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return products.products.slice(start, end);
    }, [page, rowsPerPage, products]);

    // The disabledKeys are the products with invoice_id different from null
    // As that means that the product is already in an invoice and we can't
    // use it in another invoice
    React.useEffect(() => {
        setDisabledKeys(products.products.filter((product) => product.invoice_id !== null).map((product) => product.id_product.toString()));
    }, [products.products]);

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
                selectionMode="multiple"
                disabledKeys={disabledKeys}
                onSelectionChange={(keys) => setSelectedProducts(new Set(keys))}
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
                    <TableRow
                        key={item.id_product}
                    >
                        {(columnKey) => 
                            <TableCell>
                                {RenderCell({ product: item, columnKey: columnKey, replaceProductInState: replaceProductInState })}
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
