import { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";

import { Product } from "@/types";
import { useCart } from "@/hooks";
import { ProductAttributes } from "@/components/ui";

interface AttributeSelection {
  [attributeName: string]: string;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedAttributes, setSelectedAttributes] =
    useState<AttributeSelection>({});

  const handleAttributeChange = (attributeSetName: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeSetName]: value }));
  };

  const handleAddToCart = () => {
    console.log("Adding to cart with attributes:", selectedAttributes);
    addToCart({
      product,
      quantity: 1,
      selectedAttributes,
    });
    return;
  };

  // Set initial selected attributes
  useEffect(() => {
    if (product.attributes.length) {
      const initialAttributes = product.attributes.reduce(
        (acc, attrSet) => ({
          ...acc,
          [attrSet.name]: attrSet.items[0].value,
        }),
        {}
      );
      setSelectedAttributes(initialAttributes);
    }
  }, [product.attributes]);

  return (
    <div className="lg:w-1/3">
      {/* product title */}
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {/* Attributes */}
      <ProductAttributes
        attributes={product.attributes}
        selectedAttributes={selectedAttributes}
        onAttributeChange={handleAttributeChange}
      />
      {/* Price */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Price:</h2>
        <p className="text-lg">${product.prices[0].amount.toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="uppercase bg-primary text-white py-2 px-4 w-full"
      >
        Add to cart
      </button>
      {/* Description */}
      <div className="mt-6">{HTMLReactParser(String(product.description))}</div>
    </div>
  );
};

export default ProductInfo;
