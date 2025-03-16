import React, { useRef } from "react";
import { AttributeSet, SelectedAttribute } from "@/types";
import { SwatchAttribute, TextAttribute } from "./components";

interface ProductAttributesProps {
  attributes: AttributeSet[];
  selectedAttributes: SelectedAttribute[];
  onAttributeChange?: (attributeSetId: string, value: string) => void;
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
}: ProductAttributesProps): JSX.Element => {
  const instanceIdRef = useRef(Math.random().toString(36).substr(2, 9));
  const clickable = !!onAttributeChange;

  /**
   * Render attribute items based on the attribute set type
   *
   * @param {AttributeSet} attrSet - The attribute set to render items for.
   * @returns {JSX.Element[]} The rendered attribute items.
   */
  const renderAttributeItems = (attrSet: AttributeSet): JSX.Element[] =>
    attrSet.items.map((attribute) => {
      const selectedAttribute = selectedAttributes?.find(
        (selected) => selected.id === attrSet.id
      );
      const isSelected = attribute.value === selectedAttribute?.value;

      const onClick = () => {
        if (onAttributeChange) {
          onAttributeChange(attrSet.id, attribute.value);
        }
      };

      // Generate a unique key for the attribute item
      const key = `${instanceIdRef.current}-${attrSet.id}-${attribute.value}`;

      return attrSet.type === "swatch" ? (
        <SwatchAttribute
          key={key}
          attribute={attribute}
          isSelected={isSelected}
          onClick={onClick}
          variant={variant}
          clickable={clickable}
        />
      ) : (
        <TextAttribute
          key={key}
          attribute={attribute}
          isSelected={isSelected}
          onClick={onClick}
          variant={variant}
          clickable={clickable}
        />
      );
    });

  return (
    <>
      {attributes.map((attrSet) => (
        <div key={`${instanceIdRef.current}-${attrSet.id}`} className="mb-4">
          <h3 className="font-semibold mb-2">{attrSet.name}:</h3>
          <ul className="flex space-x-2">{renderAttributeItems(attrSet)}</ul>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
