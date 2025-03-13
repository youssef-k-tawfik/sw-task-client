/**
 * Generates a random number with the specified number of digits.
 *
 * @param {number} digits - The number of digits for the generated number.
 * @returns {number} A random number with the specified number of digits.
 */
const generateRandomNumber = (digits: number): number => {
  if (digits <= 0) {
    throw new Error("Number of digits must be greater than 0");
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { generateRandomNumber };
