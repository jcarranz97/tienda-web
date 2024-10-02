import React from "react";
import { InvoicePayment, InvoiceProduct } from "./actions";
import { capitalize } from "@/utils/text_utils";

interface Props {
  invoice_payment: InvoicePayment
  columnKey: string | React.Key;
}

interface InvoiceProductProps {
  invoice_product: InvoiceProduct
  columnKey: string | React.Key;
}

export const RenderCell = ({ invoice_payment, columnKey }: Props) => {
  const cellValue = invoice_payment[columnKey];

  switch (columnKey) {
    case "amount":
        return cellValue ? `$${cellValue.toFixed(2)} MXN` : "";
    case "payment_date":
        return cellValue ? new Date(cellValue).toLocaleDateString() : "";
    default:
      return <span>{cellValue}</span>;
  }
};


export const RenderCellInvoiceProduct = ({ invoice_product, columnKey }: InvoiceProductProps) => {
  const cellValue = invoice_product[columnKey];

  switch (columnKey) {
    case "shipping_label":
      return <span>{capitalize(cellValue)}</span>;
    case "sale_price":
      return cellValue ? `$${cellValue.toFixed(2)} MXN` : "";
    default:
      return <span>{cellValue}</span>;
  }
};
