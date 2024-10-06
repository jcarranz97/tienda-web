"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Key } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { AddProduct } from "./add-product";
import { CreateInvoice } from "./create-invoice";
import { TableWrapper } from "./products-table";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { 
  FetchProductsResponse,
  SelectProduct,
  fetchProducts,
  fetchProductStatuses,
  FetchProductStatusesResponse,
  fetchShippingGroups,
  FetchShippingGroupsResponse,
  fetchProductLocations,
  FetchProductLocationsResponse,
} from "./actions";
import { useEffect, useState } from 'react';
import { capitalize } from "@/utils/text_utils";
import * as XLSX from "xlsx";

export default function Products() {
  const [products, setProducts] = useState<FetchProductsResponse>({ products: [], num_products: 1 });
  const [productStatuses, setProductStatuses] = useState<FetchProductStatusesResponse>({ statuses: [] });
  const [shippingGroups, setShippingGroups] = useState<FetchShippingGroupsResponse>({ groups: [] });
  const [productLocations, setProductLocations] = useState<FetchProductLocationsResponse>({ locations: [] });
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [filterSearch, setFilterSearch] = useState<string>("");

  // State variables to store selected filters
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedShippingGroup, setSelectedShippingGroup] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

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

  useEffect(() => {
    const getProductStatuses = async () => {
      const data = await fetchProductStatuses();
      if (data) {
        console.log("[Product Statuses]", data.statuses);
        setProductStatuses(data);
      }
    };
    getProductStatuses();
  }, []);

  useEffect(() => {
    const getShippingGroups = async () => {
      const data = await fetchShippingGroups();
      if (data) {
        console.log("[Shipping Groups]", data.groups);
        setShippingGroups(data);
      }
    };
    getShippingGroups();
  }, []);

  useEffect(() => {
    const getProductLocations = async () => {
      const data = await fetchProductLocations();
      if (data) {
        console.log("[Product Locations]", data.locations);
        setProductLocations(data);
      }
    };
    getProductLocations();
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

  // Function to replace a product in the state
  const replaceProductInState = (updatedProduct: SelectProduct) => {
    const newProducts = products.products.map((product) => {
      if (updatedProduct.id_product === product.id_product) {
        console.log("!!!!!!!!!Product replaced!!!!!!!!!!!", product);
        return updatedProduct;
      }
      return product;
    });


    setProducts({
      products: newProducts,
      num_products: products.num_products,
    });
  }

  // Filter the products based on selected criteria
  const filteredProducts = products.products.filter((product) => {
    return (
      (selectedStatus === "" || product.status === selectedStatus) &&
      (selectedShippingGroup === "" || product.shipping_group === selectedShippingGroup) &&
      (selectedLocation === "" || product.location_name === selectedLocation) &&
      (filterSearch === "" || product.shipping_label.toLowerCase().includes(filterSearch.toLowerCase()))
    );
  });
  

  const handleExport = () => {
    // Prepare the data in a suitable format for Excel
    console.log("Exporting products", filteredProducts);
    const data = filteredProducts.map((product) => ({
      // Index for the product starting from 1 to n
      "Index": filteredProducts.indexOf(product) + 1,
      // Shipping label in uppercase
      "Identificador": product.shipping_label.toUpperCase(),
      "Descripcion": product.description,
      "Estado": product.status,
      "Lugar": product.location_name,
      "Precio de Venta": product.sale_price,
      // Precio Sugerido is sale_price * 1.2 and rounded with no decimal places
      // and also round it to have only multiples of 10
      "Precio Sugerido": Math.round(product.sale_price * 1.2 / 10) * 10,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, "products.xlsx");
  };


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
            onValueChange={(value) => setFilterSearch(value)}
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 w-full items-center">
          <Select 
            label="Status" 
            className="max-w-xs" 
            size="md"
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            {productStatuses.statuses.map((status) => (
              <SelectItem key={status.name}>
                {capitalize(status.name)}
              </SelectItem>
            ))}
          </Select>
          <Select 
            label="Shipping Group" 
            className="max-w-xs" 
            onChange={(event) => setSelectedShippingGroup(event.target.value)}
          >
            {shippingGroups.groups.map((group) => (
              <SelectItem key={group.name}>
                {group.name}
              </SelectItem>
            ))}
          </Select>
          <Select 
            label="Location" 
            className="max-w-xs"
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            {productLocations.locations.map((location) => (
              <SelectItem key={location.name}>
                {capitalize(location.name)}
              </SelectItem>
            ))}
          </Select>
            {/* Spacer div to create empty space */}
          <div className="flex-grow"></div>
          <CreateInvoice addProductToState={addProductToState} selectedProductsIndexes={selectedProducts} products={products.products} />
          <AddProduct addProductToState={addProductToState} />
          <Button color="primary" startContent={<ExportIcon />} onClick={handleExport}>
            Export to CSV
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setLoading(true);
              fetchProducts().then((data) => {
                if (data) {
                  setProducts(data);
                  setLoading(false);
                }
              });
            }}
            >
            Refresh
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          products={{ products: filteredProducts, num_products: filteredProducts.length }}
          isLoading={loading}
          setSelectedProducts={(keys: Set<Key>) => setSelectedProducts(new Set(Array.from(keys).map(String)))}
          replaceProductInState={replaceProductInState}
        />
      </div>
    </div>
  );
};
