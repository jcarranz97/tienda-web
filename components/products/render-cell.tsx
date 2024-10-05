import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { SelectProduct } from "./actions";
import { capitalize } from "@/utils/text_utils";

interface Props {
  product: SelectProduct
  columnKey: string | React.Key;
}

export const RenderCell = ({ product, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = product[columnKey];
  switch (columnKey) {
    case "shipping_label":
      // Shiping label should be printed in uppercase
      return <span>{product.shipping_label.toUpperCase()}</span>;
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{product.shipping_group}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "available"
              ? "success"
              : cellValue === "not available"
              ? "danger"
              : "default"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View user", product.id_product)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", product.id_product)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => console.log("Delete user", product.id_product)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    case "purchase_price":
    case "shipping_cost":
      // In case it is purchase price or sale price, we add format
      // as dolar sign with 2 decimal places and return it
      // If null, we return an empty string
      return cellValue ? `$${cellValue.toFixed(2)} USD` : "";
    case "purchase_price_mxn":
    case "sale_price":
    case "mx_iva":
          // In case it is purchase price or sale price, we add format
          // as dolar sign with 2 decimal places and return it
          // If null, we return an empty string
          return cellValue ? `$${cellValue.toFixed(2)} MXN` : "";
    case "profit":
            // In case it is purchase price or sale price, we add format
            // as dolar sign with 2 decimal places and return it
            // If null, we return an empty string
            // The profit should be the value in MXN + the percentage of profit
            // Example: 100.00 MXN (27%)
            // If the profit is negative, it should be printed in red
            // If the profit is positive, it should be printed in green
            return cellValue ? (
              <span className={`font-semibold text-${cellValue > 0 ? "success" : "danger"} text-md`}>
                {cellValue > 0 ? "+" : ""}{cellValue.toFixed(2)} MXN
              </span>
            ) : "";
    case "profit_percentage":
      // Truncate the profit percentage to 0 decimal places
      // Make a rule for the profit percentage so that if it is positive
      // it is printed in green with an arrow pointing up and if it is negative
      // it is printed in red with an arrow pointing down
      // Example: <span className="font-semibold text-success text-xs">{"↑"}</span>
      return cellValue ? (
        <span className={`font-semibold text-${cellValue > 0 ? "success" : "danger"} text-md`}>
          {cellValue > 0 ? "↑" : "↓"} {Math.abs(cellValue)}%
        </span>
      ) : "";
    default:
      return cellValue;
  }
};
