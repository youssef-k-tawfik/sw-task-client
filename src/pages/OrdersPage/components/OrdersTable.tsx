import React from "react";
import { Order } from "@/types";

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewOrder }) => {
  return (
    <table className="min-w-fit max-w-2xl mx-auto">
      <thead>
        <tr>
          <th className="p-2 border-b">ID</th>
          <th className="p-2 border-b">Order Number</th>
          <th className="p-2 border-b">Date</th>
          <th className="p-2 border-b">Details</th>
        </tr>
      </thead>
      <tbody className="font-roboto text-center">
        {orders.length > 0 ? (
          orders.map((order, i) => (
            <tr key={order.orderNumber} className="odd:bg-gray-200">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{order.orderNumber}</td>
              <td className="p-2">{order.placedAt}</td>
              <td className="p-2">
                <button
                  className="w-full p-2 bg-primary text-white uppercase text-sm border-primary"
                  onClick={() => onViewOrder(order)}
                >
                  View Order
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="p-2">
              No orders found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
