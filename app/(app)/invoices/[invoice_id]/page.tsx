import React from "react";
import InvoiceDetails from "@/components/invoice-details";
import { InvoiceDetailsProps } from "@/components/invoice-details";

const invoice_details = ({ params }: InvoiceDetailsProps) => {
  return <InvoiceDetails params={params} />;
};

export default invoice_details;
  