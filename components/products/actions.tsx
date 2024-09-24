// app/products/actions.ts

export interface SelectProduct {
    id_product: number;
    description: string;
    shipping_label: string;
    purchase_price: number;
    shipping_group: string;
    status: string;
    location_name: string;
    purchase_price_mxn: number;
    sale_price: number;
    profit: number;
}


export type GetProductResponse = {
    products: SelectProduct[];
    newOffset: number | null;
    totalProducts: number;
};


// Define the type for the response
export interface FetchProductsResponse {
  products: SelectProduct[];
}

// Fetch posts with type annotations
export const fetchProducts = async (): Promise<FetchProductsResponse | null> => {
  try {
    const res = await fetch('http://localhost:8000/products/get-products');
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchProductsResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
};