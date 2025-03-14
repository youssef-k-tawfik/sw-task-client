import classNames from "classnames";
import React from "react";

const variantClasses: Record<string, string> = {
  small: "w-5 h-5",
  default: "w-8 h-8",
  large: "w-12 h-12",
};

interface SwatchAttributeProps {
  attribute: { value: string };
  isSelected: boolean;
  onClick: () => void;
  variant?: "default" | "small";
  clickable?: boolean;
}

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
