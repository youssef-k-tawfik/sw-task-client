import axiosInstance from "../axiosInstance";

interface FetchCategoriesResponse {
  data: {
    data: {
      categories: { name: string }[];
    };
    errors?: { message: string }[];
  };
}
/**
 * Fetches a list of category names from the API.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of category names.
 */
export const fetchCategories = async (): Promise<string[]> => {
  const query = `
    query {
      categories {
        name
      }
    }
  `;

  try {
    const response: FetchCategoriesResponse = await axiosInstance.post("", {
      query,
    });

    const categories = response.data.data.categories.map(
      (category) => category.name
    );
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
