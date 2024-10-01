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
import { AddShippingGroup } from "./add-shipping-group";
import { TableWrapper } from "./table";
import { 
  FetchShippingGroupsResponse,
  ShippingGroup,
  fetchShippingGroups,
} from "./actions";
import { useEffect, useState } from 'react';
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";


export default function ShippingGroups() {
  const [shippingGroups, setShippingGroups] = useState<FetchShippingGroupsResponse>({ groups: [], num_groups: 1 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getShippingGroups = async () => {
      const data = await fetchShippingGroups(); // Call the external function
      console.log("fetching shipping groups", data);
      if (data) {
        setShippingGroups(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getShippingGroups();
  }, []);

  // Function to add a new product to the state
  const addShippingGroupToState = (newProduct: ShippingGroup) => {
    console.log("adding product to state", newProduct);
    setShippingGroups({
      // New product needs to be added to the state at the end
      groups: [...shippingGroups.groups, newProduct],
      num_groups: shippingGroups.num_groups + 1,
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
          <ReportsIcon />
          <span>Shipping Groups </span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Shipping Groups</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search Shipping Groups"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddShippingGroup addShippingGroupToState={addShippingGroupToState} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper shippingGroups={shippingGroups} isLoading={loading} />
      </div>
    </div>
  );
};
