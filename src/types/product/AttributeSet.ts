import { Attribute } from "./Attribute";

export interface AttributeSet {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
}
