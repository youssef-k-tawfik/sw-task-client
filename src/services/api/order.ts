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

/**
 * Places an order with the given order items.
 *
 * @param {OrderItem[]} orderItems - The items to be ordered.
 * @returns {Promise<string>} - A promise that resolves to the order number.
 * @throws {Error} - Throws an error if the order placement fails.
 */
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

  const orderNumber = response.data.data.placeOrder.order_number;

  // append the order number to order_numbers in localStorage
  const orderNumbers = JSON.parse(
    localStorage.getItem("order_numbers") || "[]"
  );
  orderNumbers.push(orderNumber);
  localStorage.setItem("order_numbers", JSON.stringify(orderNumbers));

  return orderNumber;
};

export { placeOrder };
