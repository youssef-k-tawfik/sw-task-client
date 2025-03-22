import axiosInstance from "../../axiosInstance";

export interface FetchDatesResponse {
  dates: string[];
}

const fetchDates = async (
  orders: string[],
  signal: AbortSignal
): Promise<string[]> => {
  const query: string = `
    query ($orders: [String!]!) {
      dates(orders: $orders)
    }
  `;

  const variables = {
    orders,
  };

  try {
    const response = await axiosInstance.post(
      "",
      { query, variables },
      { signal }
    );
    return response.data.data.dates;
  } catch (err) {
    if (
      err instanceof Error &&
      err.name !== "CanceledError" &&
      err.name !== "AbortError"
    ) {
      console.error("Error fetching dates:", err);
    }
    throw err;
  }
};

export { fetchDates };
