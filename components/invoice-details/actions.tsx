// app/products/actions.ts

export interface InvoicePayment {
    id: number;
    amount: string;
    payment_date: string;
    payment_comment: string;
    [key: string]: any; // Add index signature
}


// Define the type for the response
export interface FetchInvoicePaymentsResponse {
  payments: InvoicePayment[];
  num_payments: number;
}


export interface InvoiceProduct {
    id: number;
    shipping_label: string;
    description: string;
    sale_price: number;
    [key: string]: any; // Add index signature
}


export interface FetchInvoiceProductsResponse {
  products: InvoiceProduct[];
  num_products: number;
}


export interface SelectInvoiceDetails {
    id: number;
    notes: string;
    seller_name: string;
    total_amount: string;
    num_products: number;
    num_payments: number;
    total_paid: number;
    [key: string]: any; // Add index signature
}

// Fetch posts with type annotations
export const fetchInvoicePayments = async (invoice_id: number): Promise<FetchInvoicePaymentsResponse | null> => {
  try {
    // URL: http://localhost:8000/invoices/{invoice_id}/payments
    const res = await fetch(`http://localhost:8000/invoices/${invoice_id}/payments`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchInvoicePaymentsResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
};


// Fetch posts with type annotations
export const fetchInvoiceProducts = async (invoice_id: number): Promise<FetchInvoiceProductsResponse | null> => {
  try {
    // URL: http://localhost:8000/invoices/{invoice_id}/products
    const res = await fetch(`http://localhost:8000/invoices/${invoice_id}/products`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchInvoiceProductsResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
}


// Fetch posts with type annotations
export const fetchInvoiceDetails = async (invoice_id: number): Promise<SelectInvoiceDetails | null> => {
  try {
    // URL: http://localhost:8000/invoices/{invoice_id}
    const res = await fetch(`http://localhost:8000/invoices/${invoice_id}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: SelectInvoiceDetails = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
}



export interface AddInvoicePayment {
  invoice_id: number;
  amount: string;
  payment_date: string;
  payment_comment: string;
}


export const addInvoicePayment = async (data: AddInvoicePayment): Promise<InvoicePayment | null> => {
  try {
    console.log("Sending payment data", data);
    const res = await fetch(`http://localhost:8000/invoices/${data.invoice_id}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const payment: InvoicePayment = await res.json();
    return payment; // Return the created payment
  } catch (error) {
    console.error('Failed to add payment:', error);
    return null; // Handle fetch error gracefully
  }
}
