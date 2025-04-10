import { Order } from "@/types";
import OrderProductItem from "./OrderProductItem";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

/**
 * Renders a modal displaying the details of an order.
 *
 * @param {OrderDetailsModalProps} param - The props for the component.
 * @param {Order} param.order - The order object containing details to display.
 * @param {() => void} param.onClose - Callback function to close the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}: OrderDetailsModalProps): JSX.Element => {
  const { orderNumber, totalAmount, currency, placedAt, products } = order;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          Order Details for: {orderNumber}
        </h2>
        <div className="max-h-96 overflow-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y-1 divide-slate-200">
              <tr>
                <th className="font-semibold text-center">Order Number</th>
                <td>{orderNumber}</td>
              </tr>
              <tr>
                <th className="font-semibold text-center">Total Amount</th>
                <td>
                  {currency.symbol}
                  {totalAmount}
                </td>
              </tr>
              <tr>
                <th className="font-semibold text-center">Placed At</th>
                <td>{placedAt}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold my-4 text-center bg-gray-200">
            Order Products
          </h3>
          <ul className="divide-y-1 divide-slate-200 space-y-4">
            {products.map((orderProduct, index) => (
              <OrderProductItem
                key={index + orderProduct.product.name}
                orderProduct={orderProduct}
                currency={currency}
              />
            ))}
          </ul>
        </div>
        <button
          className="uppercase mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
