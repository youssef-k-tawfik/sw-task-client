import { Attribute } from "@/types";
import classNames from "classnames";
import React from "react";

const variantClasses: Record<string, string> = {
  small: "w-5 h-5",
  default: "w-8 h-8",
  large: "w-12 h-12",
};

/**
 * Props for the SwatchAttribute component.
 * @typedef {Object} SwatchAttributeProps
 * @property {{ value: string }} attribute - The attribute object containing value and other properties.
 * @property {boolean} isSelected - Indicates if the attribute is selected.
 * @property {() => void} onClick - Function to call when the attribute is clicked.
 * @property {"default" | "small"} [variant="default"] - The variant of the attribute, can be "default" or "small".
 * @property {boolean} [clickable=true] - Indicates if the attribute is clickable.
 */
interface SwatchAttributeProps {
  attribute: Attribute;
  isSelected: boolean;
  onClick: () => void;
  variant?: "default" | "small";
  clickable?: boolean;
}

/**
 * SwatchAttribute component to display a swatch attribute with different styles based on props.
 *
 * @param {SwatchAttributeProps} props - The props for the component.
 * @param {Attribute} props.attribute - The attribute object containing value and other properties.
 * @param {boolean} props.isSelected - Indicates if the attribute is selected.
 * @param {() => void} props.onClick - Function to call when the attribute is clicked.
 * @param {"default" | "small"} [props.variant="default"] - The variant of the attribute, can be "default" or "small".
 * @param {boolean} [props.clickable=true] - Indicates if the attribute is clickable.
 * @returns {JSX.Element} The rendered swatch attribute component.
 */
const SwatchAttribute: React.FC<SwatchAttributeProps> = ({
  attribute,
  isSelected,
  onClick,
  variant = "default",
  clickable = true,
}) => {
  const baseClasses = "p-0.5";
  const variantClass = variantClasses[variant] || variantClasses.default;

  return (
    <li
      className={classNames(baseClasses, variantClass, {
        "border-primary border-2": isSelected,
        "cursor-pointer": clickable,
        "cursor-default": !clickable,
      })}
      onClick={onClick}
    >
      <span
        className="block w-full h-full"
        style={{ backgroundColor: attribute.value }}
      />
    </li>
  );
};

export default SwatchAttribute;
