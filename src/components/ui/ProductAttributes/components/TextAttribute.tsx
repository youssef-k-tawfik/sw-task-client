import React from "react";
import { Attribute } from "@/types";
import classNames from "classnames";

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
  const variantClasses = variant === "small" ? "p-0.5 w-10 text-sm " : "p-2";

  return (
    <li
      className={classNames(baseClasses, variantClasses, {
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
