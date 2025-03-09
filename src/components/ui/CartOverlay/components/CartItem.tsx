interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

const CartItem = ({ item }: { item: CartItem }) => {
  const { name, quantity, price, imageUrl } = item;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;