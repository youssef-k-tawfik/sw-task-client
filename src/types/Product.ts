import { AttributeSet } from "./AttributeSet";
import { Price } from "./Price";

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
