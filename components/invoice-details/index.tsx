"use client";
import { Input, Card, CardBody} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";;
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { InvoicePaymentsTable } from "./payments-table";
import { InvoiceProductsTable } from "./products-table";
import { 
  fetchInvoicePayments,
  FetchInvoicePaymentsResponse,
  fetchInvoiceProducts,
  FetchInvoiceProductsResponse,
  SelectInvoiceDetails,
  fetchInvoiceDetails,
} from "./actions";
import { useEffect, useState } from 'react';
import { ReportsIcon } from "@/components/icons/sidebar/reports-icon";
import { capitalize } from "@/utils/text_utils";
import InvoiceCard from "./invoice-card";

export interface InvoiceDetailsProps {
  params: {
    invoice_id: string; // The `id` parameter is always passed as a string by Next.js
  };
}

export default function InvoiceDetails({ params }: InvoiceDetailsProps) {
  console.log("InvoiceDetails - Params: ", params);
  const { invoice_id } = params;
  console.log("InvoiceDetails - Invoice ID: ", invoice_id);
  const [invoicePayments, setInvoicePayments] = useState<FetchInvoicePaymentsResponse>({ payments: [], num_payments: 1 });
  const [invoiceProducts, setInvoiceProducts] = useState<FetchInvoiceProductsResponse>({ products: [], num_products: 1 });
  const [invoiceDetails, setInvoiceDetails] = useState<SelectInvoiceDetails>({ id: 0, notes: "", seller_name: "", total_amount: "", num_products: 0, num_payments: 0, total_paid: 0 });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getInvoicePayments = async () => {
      const data = await fetchInvoicePayments(parseInt(invoice_id)); // Call the external function
      console.log("fetching shipping groups", data);
      if (data) {
        setInvoicePayments(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getInvoicePayments();
  }, []);

  useEffect(() => {
    const getInvoiceProducts = async () => {
      const data = await fetchInvoiceProducts(parseInt(invoice_id)); // Call the external function
      console.log("fetching shipping groups", data);
      if (data) {
        setInvoiceProducts(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getInvoiceProducts();
  }, []);
  

  useEffect(() => {
    const getInvoiceDetails = async () => {
      const data = await fetchInvoiceDetails(parseInt(invoice_id)); // Call the external function
      console.log("fetching shipping groups", data);
      if (data) {
        setInvoiceDetails(data); // Set the fetched data to the state
      }
    };
    console.log("changing loading state");
    setLoading(false);
    getInvoiceDetails();
  }, []);

  // Wait for the data to be fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  const addPaymentToState = (newPayment: any) => {
    setInvoicePayments({ ...invoicePayments, payments: [...invoicePayments.payments, newPayment] });
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
          <span>Invoices </span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Invoice - {invoice_id}</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Invoice {invoice_id} details</h3>
      <InvoiceCard invoiceDetails={invoiceDetails} />
      <div className="max-w-[95rem] mx-auto w-full flex gap-4">
        <div className="w-1/2">
          <InvoicePaymentsTable
            invoice_payments={invoicePayments}
            isLoading={loading}
            invoice_id={parseInt(invoice_id)}
            addPaymentToState={addPaymentToState}
            setInvoiceDetails={setInvoiceDetails}
          />
        </div>
        <div className="w-1/2">
          <InvoiceProductsTable invoice_products={invoiceProducts} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};
