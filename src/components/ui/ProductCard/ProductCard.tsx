import { Link } from "react-router-dom";
import { Product, SelectedAttribute } from "@/types";
import { CartIcon } from "@/assets/icons";
import { useCart } from "@/hooks";
import { kebabCase } from "@/utils";

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
        { attributeSetId: attrSet.id, attributeId: attrSet.items[0].id },
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
    <Link
      to={`/product/${product.id}`}
      className="block group"
      data-testid={`product-${kebabCase(product.name)}`}
    >
      <div className="p-2 hover:shadow-lg transition duration-300 ease-in-out hover:scale-105">
        <div className="relative h-[330px] mb-4">
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
            // background opacity is 60 instead of 50 (as per figma)
            // to make the text more readable on the Xbox item
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <p className="text-[#8D8F9A] text-2xl">Out of Stock</p>
            </div>
          )}
        </div>
        <h3 className="font-light text-lg">{product.name}</h3>
        <p className="text-lg">$ {product.prices[0].amount.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
