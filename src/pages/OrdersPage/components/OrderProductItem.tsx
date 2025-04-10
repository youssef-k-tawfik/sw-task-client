import { ProductAttributes } from "@/components/ui";
import { Currency, OrderProduct } from "@/types";
import { getPriceAmount } from "@/utils";

interface OrderProductItemProps {
  orderProduct: OrderProduct;
  currency: Currency;
}

/**
 * Renders an individual order product item.
 *
 * @param {OrderProductItemProps} param - The props containing order product details and currency.
 * @returns {JSX.Element} The JSX element representing the order product item.
 */
const OrderProductItem: React.FC<OrderProductItemProps> = ({
  orderProduct,
  currency,
}: OrderProductItemProps): JSX.Element => {
  const { product, quantity, selectedAttributes } = orderProduct;
  return (
    <li className="flex gap-4 justify-between pb-4">
      {/* product details */}
      <div className="grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="mb-2">
          <span className="font-semibold text-center">Price: </span>
          {currency.symbol}
          {getPriceAmount(product.prices, currency.label)}
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

export default OrderProductItem;
