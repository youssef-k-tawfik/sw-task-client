/**
 * PlusIcon component renders an SVG icon representing a plus sign.
 *
 * @returns {JSX.Element} A React functional component that displays a plus icon.
 */
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (): JSX.Element => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export { PlusIcon };
