import { Order } from "@/types";
import axiosInstance from "../../axiosInstance";

interface FetchOrdersResponse {
  data: {
    data: {
      orders: Order[];
    };
    errors?: { message: string }[];
  };
}

interface OrderQueryVariables {
  orderNumbers: string[];
}

export const fetchOrders = async (variables: OrderQueryVariables) => {
  const query = `
    query orders($orderNumbers: [String!]!) {
      orders(orderNumbers: $orderNumbers) {
        orderNumber
        totalAmount
        currency {
          label
          symbol
          __typename
        }
        placedAt
        products {
          product {
            id
            name
            description
            inStock
            brand
            category
            gallery
            prices {
              amount
              currency {
                symbol
                label
                __typename
              }
              __typename
            }
            attributes {
              id
              name
              type
              items {
                id
                value
                displayValue
                __typename
              }
              __typename
            }
            __typename
          }
          quantity
          selectedAttributes {
            attributeSetId
            attributeId
            __typename
          }
          __typename
        }
      }
    }
  `;

  try {
    const response: FetchOrdersResponse = await axiosInstance.post("", {
      query,
      variables,
    });

    if (response.data.errors && response.data.errors.length > 0) {
      console.error("GraphQL errors:", response.data.errors);
      return [];
    }

    console.log("Response data:", response.data);
    return response.data.data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
