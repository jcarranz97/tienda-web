// app/products/actions.ts

export interface SelectProduct {
    id_article: number;
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

export async function getProducts(
/*   search: string,
  offset: number */
): Promise<{
    products: SelectProduct[];
    newOffset: number | null;
    totalProducts: number;
}> {
  try {
    // Return mock data for now
    console.log("Trying to fetch products");
    return {
        products: [
            {
            id_article: 1,
            description: "Product 1",
            shipping_label: "Label 1",
            purchase_price: 1,
            shipping_group: "Group 1",
            status: "active",
            location_name: "Location 1",
            purchase_price_mxn: 1,
            sale_price: 1,
            profit: 1
            },
            {
            id_article: 2,
            description: "Product 2",
            shipping_label: "Label 2",
            purchase_price: 2,
            shipping_group: "Group 2",
            status: "paused",
            location_name: "Location 2",
            purchase_price_mxn: 2,
            sale_price: 2,
            profit: 2
            },
            {
            id_article: 3,
            description: "Product 3",
            shipping_label: "Label 3",
            purchase_price: 3,
            shipping_group: "Group 3",
            status: "active",
            location_name: "Location 3",
            purchase_price_mxn: 3,
            sale_price: 3,
            profit: 3
            }
        ],
        newOffset: null,
        totalProducts: 3
    };



    const response = await fetch(`http://localhost:8000/articles/get-articles`);
    
    console.log("Trying to fetch products");
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return {
      products: data.products, // Adjust based on the API response structure
      newOffset: data.newOffset, // Adjust based on the API response structure
      totalProducts: data.totalProducts // Adjust based on the API response structure
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw or handle error as needed
  }
}
