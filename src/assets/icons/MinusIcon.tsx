/**
 * MinusIcon component renders an SVG icon representing a minus sign.
 *
 * @returns {JSX.Element} A React functional component that displays a minus icon.
 */
const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export { MinusIcon };
