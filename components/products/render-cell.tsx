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
      return <span>{capitalize(product.shipping_label)}</span>;
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
    case "sale_price":
      // In case it is purchase price or sale price, we add format
      // as dolar sign with 2 decimal places and return it
      // If null, we return an empty string
      return cellValue ? `$${cellValue.toFixed(2)}` : "";
    default:
      return cellValue;
  }
};
