import { useCallback, useState } from "react";
import HTMLReactParser from "html-react-parser";

import { Product, SelectedAttribute } from "@/types";
import { useCart } from "@/hooks";
import { ProductAttributes } from "@/components/ui";
import { getPriceAmount } from "@/utils";

interface ProductInfoProps {
  product: Product;
}

/**
 * Renders the ProductInfo component which displays product details,
 * attributes, price, and allows adding the product to the cart.
 *
 * @param {ProductInfoProps} props - The props for the component.
 * @param {Product} props.product - The product to display information for.
 * @returns {JSX.Element} The rendered ProductInfo component.
 */
const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart, currency } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >([]);

  const handleAttributeChange = useCallback(
    (attributeSetId: string, attributeId: string): void => {
      setSelectedAttributes((prev) => {
        const updatedAttributes = [...prev];
        const index = updatedAttributes.findIndex(
          (attr) => attr.attributeSetId === attributeSetId
        );

        if (index !== -1) {
          // Update existing attribute
          updatedAttributes[index] = { attributeSetId, attributeId };
        } else {
          // Add new attribute
          updatedAttributes.push({ attributeSetId, attributeId });
        }

        return updatedAttributes;
      });
    },
    []
  );

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1,
      selectedAttributes,
    });
    return;
  };

  return (
    <div className="lg:w-1/3">
      {/* product title */}
      <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
      {/* Attributes */}
      <ProductAttributes
        attributes={product.attributes}
        selectedAttributes={selectedAttributes}
        onAttributeChange={handleAttributeChange}
        testIdPrefix="product-attribute"
      />
      {/* Price */}
      <div className="mb-4 font-bold">
        <h2 className="text-lg">Price:</h2>
        <p className="text-2xl">
          {currency.symbol}
          {getPriceAmount(product.prices, currency.label)}
        </p>
      </div>
      <button
        disabled={
          !product.inStock ||
          selectedAttributes.length < product.attributes.length
        }
        onClick={handleAddToCart}
        className="uppercase bg-primary hover:bg-green-500 text-white font-semibold py-2 px-4 w-full"
        data-testid="add-to-cart"
        title={
          product.inStock &&
          selectedAttributes.length < product.attributes.length
            ? "Please select all attributes before adding to cart"
            : undefined
        }
      >
        Add to cart
      </button>
      {/* Description */}
      <div className="mt-6 font-roboto prose" data-testid="product-description">
        {HTMLReactParser(String(product.description))}
      </div>
    </div>
  );
};

export default ProductInfo;
