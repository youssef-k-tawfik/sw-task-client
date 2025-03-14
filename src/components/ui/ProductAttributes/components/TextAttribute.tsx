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
}

const TextAttribute: React.FC<TextAttributeProps> = ({
  attribute,
  isSelected,
  onClick,
  variant = "default",
  clickable = true,
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
    >
      <span className="block">{attribute.value}</span>
    </li>
  );
};

export default TextAttribute;
