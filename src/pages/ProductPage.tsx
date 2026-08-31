import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, formatPrice } from '@/types';
import { Link, useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ShieldCheck,
  FlaskConical,
  Leaf,
  Truck,
  ChevronRight,
} from 'lucide-react';

export default function ProductPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!error && data) {
        setProduct(data);
        const { data: rel } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(4);
        if (rel) setRelated(rel);
      }
      setLoading(false);
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-32 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
          Product not found
        </h1>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-full"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-primary-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-primary-700">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-primary-700">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-cream-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-semibold rounded-full bg-accent-500 text-primary-900">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary-500 uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent-500 text-accent-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews_count} reviews)</span>
            </div>

            <p className="font-serif text-3xl font-semibold text-primary-800 mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-cream-50 rounded-2xl">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Size</p>
                <p className="font-semibold text-gray-900">{product.size}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Strength</p>
                <p className="font-semibold text-gray-900">{product.strength}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Stock</p>
                <p className="font-semibold text-primary-600">
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Quantity & add */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-600 hover:text-primary-700"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-600 hover:text-primary-700"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-full transition-all ${
                  added
                    ? 'bg-primary-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to cart
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={!product.in_stock}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold rounded-full transition-all disabled:opacity-50 mb-8"
            >
              Buy now
            </button>

            {/* Trust icons */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Leaf, label: 'Organically grown' },
                { icon: FlaskConical, label: 'Lab tested' },
                { icon: ShieldCheck, label: 'No fillers or additives' },
                { icon: Truck, label: 'Free shipping over $75' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-primary-500 shrink-0" />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            {product.benefits.length > 0 && (
              <div className="border-t border-gray-100 pt-6 mb-6">
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                  Ingredients
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-cream-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-primary-900 mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
