import { Product } from "@/types";
import axiosInstance from "../axiosInstance";

interface FetchProductsResponse {
  data: {
    data: {
      products: Product[];
    };
    errors?: { message: string }[];
  };
}

interface Options {
  category?: string;
  id?: string;
}

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

  // Prepare variables for the GraphQL query.
  const variables: Options = {};
  if (category && category !== "all") {
    variables.category = category;
  }
  if (id) {
    variables.id = id;
  }

  const query: string = `
    query ($category: String, $id: String) {
      products(category: $category, id: $id) {
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
          items {
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
    const response: FetchProductsResponse = await axiosInstance.post(
      "",
      { query, variables },
      { signal }
    );
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

export { fetchProducts };
