import { Product, formatPrice } from '@/types';
import { Link } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const badgeColors: Record<string, string> = {
    'Best Seller': 'bg-accent-500 text-primary-900',
    'New': 'bg-primary-600 text-white',
    'Sale': 'bg-red-500 text-white',
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
              badgeColors[product.badge] || 'bg-primary-600 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4 lg:p-5 flex flex-col flex-1">
        <span className="text-xs text-primary-500 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="font-serif text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviews_count})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-serif text-lg lg:text-xl font-semibold text-primary-800">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-full transition-all ${
              added
                ? 'bg-primary-600 text-white'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white'
            }`}
            aria-label="Add to cart"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </Link>
  );
}
