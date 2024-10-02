"use client";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";;
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "./table";
import { 
  fetchInvoices,
  FetchInvoicesResponse,
} from "./actions";
import { useEffect, useState } from 'react';
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";


export default function Invoices() {
  const [invoices, setInvoices] = useState<FetchInvoicesResponse>({ invoices: [], num_invoices: 1 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getInvoices = async () => {
      const data = await fetchInvoices(); // Call the external function
      console.log("fetching shipping groups", data);
      if (data) {
        setInvoices(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getInvoices();
  }, []);

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
          <span>Invoices </span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Invoices</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search Invoices"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper invoices={invoices} isLoading={loading} />
      </div>
    </div>
  );
};
