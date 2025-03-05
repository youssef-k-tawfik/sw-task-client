import { Link } from "react-router-dom";
import { Product } from "@/types";

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
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="p-2 hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 rounded-lg">
        <div className="relative h-[330px]">
          <img
            src={product.gallery[0]}
            className="w-full h-full object-contain"
            alt="product image"
          />
          {!product.inStock && (
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
