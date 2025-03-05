import axios from "axios";
import { Product } from "@/types";

interface Options {
  category?: string;
  id?: string;
}

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
 * @param {Options} [options] - Optional parameters to filter products by category or ID.
 * @returns {Promise<Product[]>} - A promise that resolves to the list of products.
 * @throws {Error} - Throws an error if the request fails.
 */
const fetchProducts = async (
  options: Options = {},
  signal?: AbortSignal
): Promise<Product[]> => {
  const { category, id } = options;

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
    const response = await axiosInstance.post("", { query }, { signal });
    return response.data.data.products;
  } catch (err) {
    if (
      err instanceof Error &&
      err.name !== "CanceledError" &&
      err.name !== "AbortError"
    ) {
      console.error("Error fetching products:", err);
    }
    throw err;
  }
};

export default fetchProducts;
