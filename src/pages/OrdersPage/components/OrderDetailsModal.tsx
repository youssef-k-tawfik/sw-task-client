import { ProductAttributes } from "@/components/ui";
import { Order, OrderProduct } from "@/types";
import { getPriceAmount } from "@/utils";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
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
          {/* <p>Order Number: {orderNumber}</p>
          <p>
            Total Amount: {currency.symbol}
            {totalAmount}
          </p>
          <p>Placed At: {placedAt}</p> */}
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

const OrderProductItem = ({ orderProduct }: { orderProduct: OrderProduct }) => {
  const { product, quantity, selectedAttributes } = orderProduct;
  return (
    <li className="flex gap-4 justify-between pb-4">
      {/* product details */}
      <div className="grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="mb-2">
          <span className="font-semibold text-center">Price: </span>
          {product.prices[0].currency.symbol}
          {getPriceAmount(product.prices, product.prices[0].currency.label)}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-center"> Quantity:</span>{" "}
          {quantity}
        </p>
        <ProductAttributes
          attributes={product.attributes}
          selectedAttributes={selectedAttributes}
          variant="small"
        />
      </div>
      {/* product main image */}
      <div className="w-1/3">
        <img
          src={product?.gallery[0]}
          alt="product image"
          className="block w-full h-full object-contain"
        />
      </div>
    </li>
  );
};
