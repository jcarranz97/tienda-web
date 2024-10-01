"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { AddProduct } from "./add-product";
import { TableWrapper } from "./products-table";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { 
  FetchProductsResponse,
  SelectProduct,
  fetchProducts,
} from "./actions";
import { useEffect, useState } from 'react';


export default function Products() {
  const [products, setProducts] = useState<FetchProductsResponse>({ products: [], num_products: 1 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(); // Call the external function
      console.log("fetching products", data);
      if (data) {
        setProducts(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getProducts();
  }, []);

  // Function to add a new product to the state
  const addProductToState = (newProduct: SelectProduct) => {
    console.log("adding product to state", newProduct);
    setProducts({
      // New product needs to be added to the state at the end
      products: [...products.products, newProduct],
      num_products: products.num_products + 1,
    });
  }

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <ProductsIcon />
          <span>Products </span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Products</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search products"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddProduct addProductToState={addProductToState} />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper products={products} isLoading={loading} />
      </div>
    </div>
  );
};
