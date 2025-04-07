import { useCallback, useState } from "react";
import HTMLReactParser from "html-react-parser";

import { Product, SelectedAttribute } from "@/types";
import { useCart } from "@/hooks";
import { ProductAttributes } from "@/components/ui";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
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
        <p className="text-2xl">${product.prices[0].amount.toFixed(2)}</p>
      </div>
      <button
        disabled={
          !product.inStock ||
          selectedAttributes.length < product.attributes.length
        }
        onClick={handleAddToCart}
        className="uppercase bg-primary hover:bg-green-500 text-white font-semibold py-2 px-4 w-full"
        data-testid="add-to-cart"
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
