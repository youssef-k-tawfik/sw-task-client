import React from "react";

interface ErrorMessageProps {
  error?: string | Error | null;
  children?: React.ReactNode;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  children,
  className = "text-red-500 text-center",
}) => {
  const errorText = error instanceof Error ? error.message : error;

  return (
    <div className={className}>{errorText ? <p>{errorText}</p> : children}</div>
  );
};

export default ErrorMessage;
