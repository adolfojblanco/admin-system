import { Category } from './Category';

export interface Product {
  id?: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  category: Category;
  category_id: string;
  is_active: boolean;
  has_stock: boolean
}
