import type { CartItem } from "@/types";

const CartItem = ({ item }: { item: CartItem }) => {
  const { product } = item;

  return <div className="text-center">{product.id}</div>;
};

export default CartItem;
