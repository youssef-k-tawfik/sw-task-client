import classNames from "classnames";
import React from "react";

export interface ChevronIconProps {
  variant: "left" | "right";
  onClick?: () => void;
  size?: string;
  className?: string;
}

/**
 * ChevronIcon component renders a chevron SVG that can be rotated based on the direction prop.
 *
 * @param {ChevronIconProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chevron icon.
 */
const ChevronIcon: React.FC<ChevronIconProps> = ({
  variant,
  onClick,
  size = "w-8 h-8",
  className = "",
}: ChevronIconProps): JSX.Element => {
  // Determine positioning class based on variant.
  const positioningClass = variant === "left" ? "left-0" : "right-0";
  // If the variant is left, we rotate the icon 180 degrees.
  const rotationClass = variant === "left" ? "rotate-180" : "";

  return (
    <svg
      onClick={onClick}
      className={classNames(
        "absolute top-1/2 transform -translate-y-1/2 cursor-pointer  text-white bg-black/50",
        positioningClass,
        rotationClass,
        size,
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-label={variant === "left" ? "Previous image" : "Next image"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

export { ChevronIcon };
