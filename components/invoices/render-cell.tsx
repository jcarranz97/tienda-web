import React from "react";
import { Invoice } from "./actions";
import { Link } from "@nextui-org/react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
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
    case "actions":
      return (
        <Link
          showAnchorIcon
          // the href if the current path/{invoice.id}
          href={`/invoices/${invoice.id}`}
          anchorIcon={<FaMoneyCheckDollar />}
        >
        </Link>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
