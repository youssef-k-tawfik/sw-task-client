import React from "react";

/**
 * NotFound component displays a message indicating that the requested page was not found.
 *
 * @returns {JSX.Element} A JSX element containing the "Page Not Found" message and error code 404.
 */
const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="text-xl font-semibold text-center py-14">
      <p>Page Not Found</p>
      <p>ERROR: 404</p>
    </div>
  );
};

export default NotFound;
