import { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";

import { Product } from "../../../types";
import Style from "./ProductInfo.module.css";

interface AttributeSelection {
  [attributeName: string]: string;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedAttributes, setSelectedAttributes] =
    useState<AttributeSelection>({});

  const handleAttributeChange = (attributeSetName: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeSetName]: value }));
  };

  const handleAddToCart = () => {
    console.log("Adding to cart with attributes:", selectedAttributes);
    // Additional add-to-cart logic
  };

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
      {product.attributes.map((attrSet) => (
        <div key={attrSet.id} className="mb-4">
          <h3 className="font-semibold mb-2">{attrSet.name}:</h3>
          <ul className="flex space-x-4">
            {attrSet.items.map((attribute) => (
              <li
                key={attribute.value}
                className={`cursor-pointer border-2 ${
                  attribute.value === selectedAttributes[attrSet.name]
                    ? "border-primary"
                    : ""
                } ${
                  attrSet.type === "swatch"
                    ? Style.swatch_item
                    : Style.text_item
                }`}
                onClick={() =>
                  handleAttributeChange(attrSet.name, attribute.value)
                }
              >
                {attrSet.type === "swatch" ? (
                  <span
                    className="block w-8 h-8"
                    style={{ backgroundColor: attribute.value }}
                  />
                ) : (
                  <span
                    className="block w-14 text-center"
                  >
                    {attribute.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
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
