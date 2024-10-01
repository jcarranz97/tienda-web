import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { ShippingGroup } from "./actions";
import { capitalize } from "@/utils/text_utils";

interface Props {
  shippingGroup: ShippingGroup
  columnKey: string | React.Key;
}

const chip_color_map: { [key: string]: "warning" | "success" | "danger" | "default" } = {
  "pending": "warning",
  "in transit": "warning",
  "delivered": "success",
  "canceled": "danger",
};

export const RenderCell = ({ shippingGroup, columnKey }: Props) => {

  switch (columnKey) {
    case "shipper":
      return <span>{capitalize(shippingGroup.shipper)}</span>;
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={chip_color_map[shippingGroup.status] || "default"}
        >
          <span className="capitalize text-xs">{shippingGroup.status}</span>
        </Chip>
      );

/*     case "actions":
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
      ); */
    case "shipping_cost":
      return shippingGroup.shipping_cost ? `$${shippingGroup.shipping_cost.toFixed(2)}` : "";
    case "total_purchase_price":
        return shippingGroup.total_purchase_price ? `$${shippingGroup.total_purchase_price.toFixed(2)}` : "";
    case "dollar_price":
      // In case it is purchase price or sale price, we add format
      // as dolar sign with 2 decimal places and return it
      // If null, we return an empty string
      return shippingGroup.dollar_price ? `$${shippingGroup.dollar_price.toFixed(2)}` : "";
    default:
      return <span>{(shippingGroup as any)[columnKey]}</span>;
  }
};
