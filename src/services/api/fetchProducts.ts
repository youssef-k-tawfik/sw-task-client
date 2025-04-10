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

interface ProductQueryVariables {
  category?: string;
  brand?: string;
  id?: string;
}

/**
 * Fetches products from the API.
 *
 * @param {ProductQueryVariables} [productQueryVariables] - Optional parameters to filter products by category or ID.
 * @returns {Promise<Product[]>} - A promise that resolves to the list of products.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchProducts = async (
  productQueryVariables: ProductQueryVariables = {}
): Promise<Product[]> => {
  const { category, brand, id } = productQueryVariables;

  // Prepare variables for the GraphQL query
  const variables: ProductQueryVariables = {
    ...(category && category !== "all" && { category }),
    ...(brand && { brand }),
    ...(id && { id }),
  };

  const query: string = `
    query Products($category: String, $brand: String, $id: String) {
      products(category: $category,brand: $brand, id: $id) {
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
    const response: FetchProductsResponse = await axiosInstance.post("", {
      query,
      variables,
    });
    return response.data.data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
