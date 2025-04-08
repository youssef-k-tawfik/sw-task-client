import { Price } from "@/types";

export const getPriceAmount = (
  prices: Price[],
  currencyLabel: string
): number | undefined => {
  return prices.find((price) => price.currency.label === currencyLabel)?.amount;
};
