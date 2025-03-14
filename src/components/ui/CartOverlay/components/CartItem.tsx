import type { CartItem } from "@/types";
import { PlusIcon, MinusIcon } from "@/assets/icons";
import { ProductAttributes } from "@/components/ui";
import { useCart } from "@/hooks";

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
}: CartItemProps): JSX.Element => {
  const { product, quantity, selectedAttributes } = item;
  const { updateQuantity } = useCart();

  return (
    <li className="flex gap-4 justify-between">
      {/* product details */}
      <div className="grow">
        <h3>{product.name}</h3>
        <p>${product.prices[0].amount}</p>
        <ProductAttributes
          attributes={product.attributes}
          selectedAttributes={selectedAttributes}
          variant="small"
        />
      </div>
      {/* product quantity */}
      <div className="flex flex-col justify-between items-center">
        <button
          className="p-1 border-2 text-lg font-semibold"
          onClick={() =>
            updateQuantity(product.id, selectedAttributes, quantity + 1)
          }
        >
          <PlusIcon />
        </button>
        <p>{quantity}</p>
        <button
          className="p-1 border-2 text-lg font-semibold"
          onClick={() =>
            updateQuantity(product.id, selectedAttributes, quantity - 1)
          }
        >
          <MinusIcon />
        </button>
      </div>
      {/* product main image */}
      <div className="w-1/3">
        <img src={product?.gallery[0]} alt="" className="block w-full" />
      </div>
    </li>
  );
};

export default CartItem;
