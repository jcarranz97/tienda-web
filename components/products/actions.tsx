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
    sale_price: number;
    profit: number;
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

// Fetch posts with type annotations
export const fetchProducts = async (): Promise<FetchProductsResponse | null> => {
  try {
    const res = await fetch('http://localhost:8000/products/');
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
    const res = await fetch('http://localhost:8000/products/get-products-statuses/');
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
  product_status_id: string;
  shipping_group_id: string;
}


export const addProduct = async (product: AddProductInput ): Promise<number> => {
  try {
    // Make a POST request to the server
    console.log(product);
    // The product object is sent as JSON in the parameters
    const res = await fetch('http://localhost:8000/products/add-product/'
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
    const res = await fetch('http://localhost:8000/products/get-locations/');
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
    const res = await fetch('http://localhost:8000/shipping/get-shipping-groups/');
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
    const res = await fetch(`http://localhost:8000/products/${id}/`);
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