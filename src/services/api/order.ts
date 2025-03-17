import axiosInstance from "../axiosInstance";
import { OrderItem } from "@/types";

interface PlaceOrderResponse {
  data: {
    data: {
      placeOrder: {
        order_number: string;
      };
    };
    errors?: { message: string }[];
  };
}

const placeOrder = async (orderItems: OrderItem[]): Promise<string> => {
  const mutation = `
    mutation PlaceOrder($orderItems: [OrderItemInput!]!) {
      placeOrder(orderItems: $orderItems) {
        order_number
      }
    }
  `;

  const response: PlaceOrderResponse = await axiosInstance.post("", {
    query: mutation,
    variables: { orderItems },
  });

  if (response.data.errors) {
    console.error("Error placing order:", response.data.errors[0].message);
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.placeOrder.order_number;
};

export { placeOrder };
