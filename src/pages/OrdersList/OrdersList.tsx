// import { ErrorMessage } from "@/components/ui";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<string[]>([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("order_numbers") || "[]");
    setOrders(orders);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "order_numbers") {
        const updatedOrders = JSON.parse(event.newValue || "[]");
        setOrders(updatedOrders);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (orders.length === 0) {
    return (
      <p className="text-xl font-semibold text-center py-14">
        No orders placed yet
      </p>
    );
  }

  const handleShowOrder = (orderNumber: string) => {
    toast.success(`Order ${orderNumber} is shown`);
    // Add code to show the order details
  };

  return (
    <div className="flex justify-center py-14 font-roboto text-nowrap">
      <div className="w-full max-w-2xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order Number</th>
              <th className="py-2 px-4 border-b">Placed Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="max-h-96 overflow-y-auto">
            {orders.map((orderNumber: string, index: number) => (
              <tr key={index + orderNumber} className="odd:bg-gray-200">
                <td className="py-2 px-4 text-center">{orderNumber}</td>
                <td className="py-2 px-4 text-center">{"ORDER DATE"}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="uppercase border-primary bg-primary text-white py-1 px-3 hover:bg-green-500"
                    onClick={() => handleShowOrder(orderNumber)}
                  >
                    Show Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
