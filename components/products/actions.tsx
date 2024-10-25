// app/products/actions.ts

export interface SelectProduct {
    id_product: number;
    description: string;
    shipping_label: string;
    purchase_price: string;
    shipping_group: string;
    status: string;
    location_name: string;
    purchase_price_mxn: number;
    invoice_id: number;
    mx_iva: number;
    sale_price: number;
    shipping_cost: number;
    profit: number;
    profit_percentage: number;
    length: number;
    width: number;
    height: number;
}


// Define the type for the response
export interface FetchProductsResponse {
  products: SelectProduct[];
  num_products: number;
}


//Define product status
export interface ProductStatus {
  id: number;
  name: string;
}

// Define the type for the response
export interface FetchProductStatusesResponse {
  statuses: ProductStatus[];
}


export interface Seller {
  id: number;
  name: string;
}


export interface FetchSellersResponse {
  sellers: Seller[];
}

export interface createInvoice {
  id_seller: number;
  notes: string;
  products: number[];
  payment: string;
  payment_date: string | null;
  payment_comment: string | null;
}

// Fetch posts with type annotations
export const fetchProducts = async (): Promise<FetchProductsResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
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


export const fetchProductStatuses = async (): Promise<FetchProductStatusesResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/get-products-statuses/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchProductStatusesResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch product statuses:', error);
    return null; // Handle fetch error gracefully
  }
}

// Define interface for addProduct api
export interface AddProductInput {
  shipping_label: string;
  description: string;
  purchase_price: string;
  product_location_id: string;
  shipping_group_id: string;
}


export const addProduct = async (product: AddProductInput ): Promise<number> => {
  try {
    // Make a POST request to the server
    console.log(product);
    // The product object is sent as JSON in the parameters
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(product),
      });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    // The response is the new product id, which is returned as a number
    const data = await res.json();
    console.log("New product id:", data);
    return data; // Return the new product id
  } catch (error) {
    console.error('Failed to add product:', error);
    return 0; // Handle add product error gracefully
  }
}


// Define product locations
export interface ProductLocation {
  id: number;
  name: string;
}

// Define the type for the response
export interface FetchProductLocationsResponse {
  locations: ProductLocation[];
}

// Fetch posts with type annotations
export const fetchProductLocations = async (): Promise<FetchProductLocationsResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/get-locations/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchProductLocationsResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch product locations:', error);
    return null; // Handle fetch error gracefully
  }
};


// Define shipping groups
export interface ShippingGroup {
  id: number;
  name: string;
}

// Define the type for the response
export interface FetchShippingGroupsResponse {
  groups: ShippingGroup[];
}

// Fetch posts with type annotations
export const fetchShippingGroups = async (): Promise<FetchShippingGroupsResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipping/get-shipping-groups/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchShippingGroupsResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch shipping groups:', error);
    return null; // Handle fetch error gracefully
  }
};


export const fetchProduct = async (id: number): Promise<SelectProduct | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: SelectProduct = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null; // Handle fetch error gracefully
  }
}




// post add-sale-price-with-id2 which is a function that takes the
// product_id and the sale_price as arguments and returns a promise with
// the SelectProduct type as the return value.
export const addSalePrice = async (product_id: number, sale_price: string): Promise<SelectProduct | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}/add-sale-price/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ sale_price: sale_price }),
      });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: SelectProduct = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to add sale price:', error);
    return null; // Handle fetch error gracefully
  }
}


export const fetchSellers = async (): Promise<FetchSellersResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers/get-sellers/`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchSellersResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch sellers:', error);
    return null; // Handle fetch error gracefully
  }
}



export const createInvoice = async (invoice: createInvoice): Promise<number> => {
  try {
    // Make a POST request to the server
    console.log("Creating invoice - ", invoice);
    // The product object is sent as JSON in the parameters
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/`
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(invoice),
      });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    // The response is the new product id, which is returned as a number
    const data = await res.json();
    console.log("New invoice id:", data);
    return data; // Return the new product id
  } catch (error) {
    console.error('Failed to add invoice:', error);
    return 0; // Handle add product error gracefully
  }
}


// put update-product-size which is a function that takes the
// product_id and the product_size as arguments and returns a promise with
// the SelectProduct type as the return value.
export const updateProductSize = async (product_id: number, length: string | null, width: string | null, height: string | null): Promise<SelectProduct | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}/size/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ length: length, width: width, height: height }),
      });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: SelectProduct = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to add sale price:', error);
    return null; // Handle fetch error gracefully
  }
}