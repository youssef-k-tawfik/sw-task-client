import classNames from "classnames";
import React from "react";

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
  const variantClasses = variant === "small" ? "w-5 h-5" : "w-8 h-8";

  return (
    <li
      className={classNames(baseClasses, variantClasses, {
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
