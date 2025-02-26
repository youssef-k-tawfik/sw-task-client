/**
 * Footer component
 *
 * @returns {JSX.Element} The rendered footer element.
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-200">
      <p className="text-center">&copy; {new Date().getFullYear()} Zeke Store . All Rights Reserved.</p>
    </footer>
  );
}
