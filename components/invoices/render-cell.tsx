import React from "react";
import { Invoice } from "./actions";
import { capitalize } from "@/utils/text_utils";

interface Props {
  invoice: Invoice
  columnKey: string | React.Key;
}

export const RenderCell = ({ invoice, columnKey }: Props) => {
  const cellValue = invoice[columnKey];

  switch (columnKey) {
    case "seller_name":
      return <span>{capitalize(invoice.seller_name)}</span>;
    case "total_amount":
    case "total_paid":
        return cellValue ? `$${cellValue.toFixed(2)} MXN` : "";
    default:
      return <span>{cellValue}</span>;
  }
};
