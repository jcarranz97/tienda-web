// app/products/actions.ts

export interface Invoice {
    id: number;
    notes: string;
    seller_name: string;
    total_amount: string;
    num_of_products: number;
    num_of_payments: number;
    total_paid: number;
    [key: string]: any; // Add index signature
}


// Define the type for the response
export interface FetchInvoicesResponse {
  invoices: Invoice[];
  num_invoices: number;
}

// Fetch posts with type annotations
export const fetchInvoices = async (): Promise<FetchInvoicesResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchInvoicesResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
};