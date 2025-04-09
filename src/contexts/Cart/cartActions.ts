import { OrderProduct, SelectedAttribute } from "@/types";
import toast from "react-hot-toast";

export const addToCart =
  (
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>,
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  (item: OrderProduct) => {
    setOrderProducts((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (orderProduct) =>
          orderProduct.product.id === item.product.id &&
          JSON.stringify(orderProduct.selectedAttributes) ===
            JSON.stringify(item.selectedAttributes)
      );

      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }

      return [...prevItems, item];
    });

    toast.success(`${item.product.name} added to cart!`);
    setIsCartOpen(true);
  };

export const removeFromCart =
  (setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>) =>
  (productId: string, selectedAttributes: SelectedAttribute[]) => {
    setOrderProducts((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
          )
      )
    );
  };

export const updateQuantity =
  (setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>) =>
  (
    productId: string,
    selectedAttributes: SelectedAttribute[],
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      removeFromCart(setOrderProducts)(productId, selectedAttributes);
      return;
    }

    setOrderProducts((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === productId &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(selectedAttributes)
      );

      if (itemIndex > -1 && newQuantity > 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity = newQuantity;
        return updatedItems;
      }

      return prevItems;
    });
  };

export const clearCart =
  (setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>) =>
  () => {
    setOrderProducts([]);
  };
