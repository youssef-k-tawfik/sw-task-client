export const kebabCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
