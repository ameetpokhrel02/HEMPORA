export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  badge: string | null;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  benefits: string[];
  ingredients: string;
  size: string;
  strength: string;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export const CATEGORIES = [
  { id: 'tinctures', label: 'Tinctures & Oils' },
  { id: 'gummies', label: 'Gummies & Edibles' },
  { id: 'topicals', label: 'Topicals & Creams' },
  { id: 'capsules', label: 'Capsules & Softgels' },
  { id: 'flower', label: 'Hemp Flower' },
] as const;

export function formatPrice(cents: number): string {
  return `$${cents.toFixed(2)}`;
}
