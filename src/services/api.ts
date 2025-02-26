import axios from "axios";
import { Product } from "../types/Product";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches products from the API.
 *
 * @param {string} [category] - Optional category to filter products by.
 * @param {string} [id] - Optional product ID to fetch a single product.
 * @returns {Promise<Product[]>} - A promise that resolves to the list of products.
 * @throws {Error} - Throws an error if the request fails.
 */
const fetchProducts = async (
  category?: string,
  id?: string
): Promise<Product[]> => {
  // manage filters
  const filters: string[] = [];
  if (category !== "all" && category) {
    filters.push(`category: "${category}"`);
  }
  if (id) {
    filters.push(`id: "${id}"`);
  }
  const filterString: string = filters.length ? `(${filters.join(", ")})` : "";

  const query: string = `
        query {
            products ${filterString} {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                    id
                    name
                    type
                    items{
                        id
                        displayValue
                        value
                        __typename
                    }
                    __typename
                }
                prices {
                    amount
                    currency {
                        label
                        symbol
                        __typename
                    }
                    __typename
                }
                brand
                __typename
            }
        }
    `;

  try {
    const response = await axiosInstance.post("", { query });
    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;
