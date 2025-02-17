export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  brand: string;
  attributes: AttributeSet[];
  prices: Price[];
}

interface AttributeSet {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
}

interface Attribute {
  id: string;
  displayValue: string;
  value: string;
}

interface Price {
  amount: number;
  currency: Currency;
}

interface Currency {
  symbol: string;
  label: string;
}
