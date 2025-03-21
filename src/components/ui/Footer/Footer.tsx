/**
 * Footer component
 *
 * @returns {JSX.Element} The rendered footer element.
 */
const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="bg-gray-500/20 font-roboto">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Zeke Store . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
