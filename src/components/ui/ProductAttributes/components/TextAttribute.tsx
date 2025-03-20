import React from "react";
import { Attribute } from "@/types";
import classNames from "classnames";

const variantClasses: Record<string, string> = {
  small: "p-0.5 min-w-10 text-sm",
  default: "p-2 min-w-14 text-base",
  large: "p-4 min-w-20 text-lg",
};

interface TextAttributeProps {
  attribute: Attribute;
  isSelected: boolean;
  onClick: () => void;
  variant?: "default" | "small";
  clickable?: boolean;
  testId?: string;
}

/**
 * TextAttribute component to display a text attribute with different styles based on props.
 *
 * @param {TextAttributeProps} props - The props for the component.
 * @param {Attribute} props.attribute - The attribute object containing value and other properties.
 * @param {boolean} props.isSelected - Indicates if the attribute is selected.
 * @param {() => void} props.onClick - Function to call when the attribute is clicked.
 * @param {"default" | "small"} [props.variant="default"] - The variant of the attribute, can be "default" or "small".
 * @param {boolean} [props.clickable=true] - Indicates if the attribute is clickable.
 * @returns {JSX.Element} The rendered text attribute component.
 */
const TextAttribute: React.FC<TextAttributeProps> = ({
  attribute,
  isSelected,
  onClick,
  variant = "default",
  clickable = true,
  testId,
}) => {
  const baseClasses = " border-2 text-center";
  const variantClass = variantClasses[variant] || variantClasses.default;

  return (
    <li
      className={classNames(baseClasses, variantClass, {
        "border-primary": isSelected,
        "cursor-pointer": clickable,
        "cursor-default": !clickable,
      })}
      onClick={onClick}
      data-testid={testId}
    >
      <span className="block">{attribute.value}</span>
    </li>
  );
};

export default TextAttribute;
