import { Chip } from "@nextui-org/react";
import React from "react";
import { SelectProduct } from "./actions";
import { AddSalePriceModal } from "../product-actions/add-sale-price-modal";
import { UpdateSizeModal } from "../product-actions/update-size";
import { UpdateMaterialModal } from "../product-actions/update-material";

interface Props {
  product: SelectProduct
  columnKey: string | React.Key;
  replaceProductInState: (updatedProduct: SelectProduct) => void;
}

export const RenderCell = ({ product, columnKey, replaceProductInState }: Props) => {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <AddSalePriceModal product={product} replaceProductInState={replaceProductInState} />
          <UpdateSizeModal product={product} replaceProductInState={replaceProductInState} />
          <UpdateMaterialModal product={product} replaceProductInState={replaceProductInState} />
          {/*       <ProductActions product={product} /> */}
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
    case 'size':
      // Size is the union of length, width and height separated by "x"
      // if both length, width and height are null, we return an empty string
      return product.length && product.width && product.height ? `${product.length}x${product.width}x${product.height}` : "";
    default:
      return cellValue;
  }
};
