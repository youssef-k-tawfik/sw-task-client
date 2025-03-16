import { Link } from "react-router-dom";
import { Product, SelectedAttribute } from "@/types";
import { CartIcon } from "@/assets/icons";
import { useCart } from "@/hooks";

interface ProductCardProps {
  product: Product;
}

/**
 * Component for displaying a product card.
 *
 * @component
 * @param {ProductCardProps} props - The properties for the ProductCard component.
 * @param {Product} props.product - The product object containing details to be displayed.
 * @returns {JSX.Element} The rendered product card component.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps): JSX.Element => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const selectedAttributes = product.attributes.reduce<SelectedAttribute[]>(
      (acc, attrSet) => [
        ...acc,
        { id: attrSet.id, value: attrSet.items[0].value },
      ],
      []
    );

    addToCart({
      product,
      quantity: 1,
      selectedAttributes,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="p-2 hover:shadow-lg transition duration-300 ease-in-out hover:scale-105">
        <div className="relative h-[330px]">
          <img
            src={product.gallery[0]}
            className="w-full h-full object-contain"
            alt="product image"
          />
          {product.inStock ? (
            <div className="absolute bottom-2 right-2 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <button
                className="bg-primary border-primary hover:bg-green-500 rounded-full p-2 w-10 h-10 flex justify-center items-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
              >
                <CartIcon size={20} color="#fff" />
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white text-2xl">Out of Stock</p>
            </div>
          )}
        </div>
        <h3>{product.name}</h3>
        <p>$ {product.prices[0].amount.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
