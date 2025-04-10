import { ErrorMessage, Loading } from "@/components/ui";
import { fetchOrders } from "@/services/api";
import { Order } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import OrdersTable from "./components/OrdersTable";
import OrderDetailsModal from "./components/OrderDetailsModal";

const OrdersPage: React.FC = (): JSX.Element => {
  const queryClient = useQueryClient();
  const [orderNumbers, setOrderNumbers] = useState<string[]>(() => {
    const storedOrderNumbers = localStorage.getItem("order_numbers");
    return storedOrderNumbers ? JSON.parse(storedOrderNumbers) : [];
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", orderNumbers],
    queryFn: async () => await fetchOrders({ orderNumbers }),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedOrderNumbers = localStorage.getItem("order_numbers");
      const parsedOrderNumbers = storedOrderNumbers
        ? JSON.parse(storedOrderNumbers)
        : [];
      setOrderNumbers(parsedOrderNumbers);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <>
        <h1 className="capitalize pt-14 mb-14 text-[42px]">My Orders</h1>
        <Loading />
      </>
    );
  }

  if (isError) {
    return <ErrorMessage error="Error fetching orders" />;
  }

  return (
    <div className="pb-14 text-nowrap">
      <h1 className="capitalize m-14 text-[42px]">My Orders</h1>
      <OrdersTable orders={orders} onViewOrder={setSelectedOrder} />
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
