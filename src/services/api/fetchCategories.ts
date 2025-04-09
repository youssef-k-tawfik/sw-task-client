import axiosInstance from "../axiosInstance";

interface FetchCategoriesResponse {
  data: {
    data: {
      categories: { name: string }[];
    };
    errors?: { message: string }[];
  };
}

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
