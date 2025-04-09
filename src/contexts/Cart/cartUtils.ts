import { Currency } from "@/types";

const DEFAULT_CURRENCY: Currency = { label: "USD", symbol: "$" };
const countryToCurrencyMap: Record<string, Currency> = {
  US: { label: "USD", symbol: "$" },
  // EU: {
  //   label: "EUR",
  //   symbol: "€",
  // },
  // EG: {
  //   label: "EGP",
  //   symbol: "ج.م",
  // },
  // Add more mappings as needed
  // (sticking to USD for now since BE only supports USD)
};

export const getCurrencyByLocation = async (): Promise<Currency> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return countryToCurrencyMap[data.country_code] || DEFAULT_CURRENCY;
  } catch (error) {
    console.error("Failed to fetch currency by location:", error);
    return DEFAULT_CURRENCY;
  }
};
