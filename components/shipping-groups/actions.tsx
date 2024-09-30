// app/products/actions.ts

export interface ShippingGroup {
    id: number;
    name: string;
    shipper: string;
    status: string;
    shipping_cost: number;
    dollar_price: number;
    num_products: number;
}


// Define the type for the response
export interface FetchShippingGroupsResponse {
  groups: ShippingGroup[];
  num_groups: number;
}


export interface ShippingGroupStatus {
  id: number;
  name: string;
  description: string;
}

export interface FetchShippingGroupStatusesResponse {
  statuses: ShippingGroupStatus[];
}

export interface Shipper {
  id: number;
  name: string;
}

export interface FetchShippersResponse {
  shippers: Shipper[];
}


export interface AddShippingGroupInput {
  name: string;
  id_shipper: string;
  id_status: string;
  shipping_cost: string;
  dollar_price: string;
  tax: string;
  notes: string;
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
    console.error('Failed to fetch products:', error);
    return null; // Handle fetch error gracefully
  }
};


export const fetchShippingGroupStatuses = async (): Promise<FetchShippingGroupStatusesResponse | null> => {
  try {
    const res = await fetch('http://localhost:8000/shipping/get-shipping-statuses/');
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchShippingGroupStatusesResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch shipping group statuses:', error);
    return null; // Handle fetch error gracefully
  }
}


export const fetchShippers = async (): Promise<FetchShippersResponse | null> => {
  try {
    const res = await fetch('http://localhost:8000/shippers/get-shippers/');
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data: FetchShippersResponse = await res.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch shippers:', error);
    return null; // Handle fetch error gracefully
  }
}


export const addShippingGroup = async (product: AddShippingGroupInput ): Promise<number> => {
  try {
    const res = await fetch('http://localhost:8000/shipping/add-shipping-group/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    console.log("Product:", product);
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${data.message}`);
    }
    console.log("[Add Shipping Group]", data);
    return data; // Return the new product id
  } catch (error) {
    console.error('Failed to add shipping group:', error);
    return 0; // Handle add product error gracefully
  }
}


export const fetchShippingGroup = async (id: number): Promise<ShippingGroup | null> => {
  try {
    const res = await fetch(`http://localhost:8000/shipping/get-shipping-group/${id}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    console.log("[Fetch Shipping Group]", data);
    return data; // Return the fetched data
  } catch (error) {
    console.error('Failed to fetch shipping group:', error);
    return null; // Handle fetch error gracefully
  }
}