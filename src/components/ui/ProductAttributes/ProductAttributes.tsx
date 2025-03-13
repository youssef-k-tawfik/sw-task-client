import React from "react";
import { generateRandomNumber } from "@/utils";
import { AttributeSet } from "@/types";
import { SwatchAttribute, TextAttribute } from "./components";

interface AttributeSelection {
  [attributeName: string]: string;
}

interface ProductAttributesProps {
  attributes: AttributeSet[];
  selectedAttributes: AttributeSelection;
  onAttributeChange?: (attributeSetName: string, value: string) => void;
  variant?: "default" | "small";
}

/**
 * ProductAttributes component renders a list of product attributes.
 * The component automatically decides if the attributes are clickable based on the presence of the onAttributeChange callback.
 *
 * @param {ProductAttributesProps} props - The properties for the component.
 * @param {AttributeSet[]} props.attributes - The list of attribute sets.
 * @param {AttributeSelection} props.selectedAttributes - The currently selected attributes.
 * @param {(attributeSetName: string, value: string) => void} [props.onAttributeChange] - Optional callback function to handle attribute changes.
 * @param {string} [props.textStyle] - Optional CSS classes for text attributes.
 * @param {string} [props.swatchStyle] - Optional CSS classes for swatch attributes.
 * @returns {JSX.Element} The rendered product attributes component.
 */
const ProductAttributes: React.FC<ProductAttributesProps> = ({
  attributes,
  selectedAttributes,
  onAttributeChange,
  variant,
}) => {
  const clickable = !!onAttributeChange;

  return (
    <>
      {attributes.map((attrSet) => (
        <div key={attrSet.id + generateRandomNumber(5)} className="mb-4">
          <h3 className="font-semibold mb-2">{attrSet.name}:</h3>
          <ul className="flex space-x-2">
            {/* Checking for the attribute set type */}
            {attrSet.type === "swatch"
              ? // If the attribute set type is swatch, render SwatchAttribute components
                attrSet.items.map((attribute) => {
                  const isSelected =
                    attribute.value === selectedAttributes[attrSet.name];
                  const onClick = () => {
                    if (onAttributeChange) {
                      onAttributeChange(attrSet.name, attribute.value);
                    }
                  };

                  return (
                    <SwatchAttribute
                      key={attribute.value + generateRandomNumber(5)}
                      attribute={attribute}
                      isSelected={isSelected}
                      onClick={onClick}
                      variant={variant}
                      clickable={clickable}
                    />
                  );
                })
              : // If the attribute set type is text, render TextAttribute components
                attrSet.items.map((attribute) => {
                  const isSelected =
                    attribute.value === selectedAttributes[attrSet.name];
                  const onClick = () => {
                    if (onAttributeChange) {
                      onAttributeChange(attrSet.name, attribute.value);
                    }
                  };

                  return (
                    <TextAttribute
                      key={attribute.value + generateRandomNumber(5)}
                      attribute={attribute}
                      isSelected={isSelected}
                      onClick={onClick}
                      variant={variant}
                      clickable={clickable}
                    />
                  );
                })}
          </ul>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
