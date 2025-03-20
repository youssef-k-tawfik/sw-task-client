import type { CartItem } from "@/types";
import { PlusIcon, MinusIcon } from "@/assets/icons";
import { ProductAttributes } from "@/components/ui";
import { useCart } from "@/hooks";

interface CartItemsListProps {
  items: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  items,
}: CartItemsListProps): JSX.Element => {
  const { updateQuantity } = useCart();

  if (!items.length) {
    return <p className="text-center my-4">Your cart is empty</p>;
  }

  return (
    <ul
      style={{ scrollbarGutter: "stable" }}
      className="divide-slate-200 space-y-4 max-h-96 overflow-auto my-4 divide-y-1 "
    >
      {items.map(({ product, quantity, selectedAttributes }) => (
        <li
          key={product.id + JSON.stringify(selectedAttributes)}
          className="flex gap-4 justify-between pb-4"
        >
          {/* product details */}
          <div className="grow">
            <h3>{product.name}</h3>
            <p data-testid="cart-item-amount">${product.prices[0].amount}</p>
            <ProductAttributes
              attributes={product.attributes}
              selectedAttributes={selectedAttributes}
              variant="small"
              testIdPrefix="cart-item-attribute"
            />
          </div>
          {/* product quantity */}
          <div className="flex flex-col justify-between items-center">
            <button
              className="p-1 border-2 text-lg font-semibold"
              onClick={() =>
                updateQuantity(product.id, selectedAttributes, quantity + 1)
              }
              data-testid="cart-item-amount-increase"
            >
              <PlusIcon />
            </button>
            <p>{quantity}</p>
            <button
              className="p-1 border-2 text-lg font-semibold"
              onClick={() =>
                updateQuantity(product.id, selectedAttributes, quantity - 1)
              }
              data-testid="cart-item-amount-decrease"
            >
              <MinusIcon />
            </button>
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
      ))}
    </ul>
  );
};

export default CartItemsList;
