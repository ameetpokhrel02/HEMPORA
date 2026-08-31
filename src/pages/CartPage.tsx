import { Link, useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/types';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { navigate } = useRouter();

  const shipping = subtotal >= 75 ? 0 : 6.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary-400" />
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-primary-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything yet. Let's fix that.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all"
          >
            Browse products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 p-4 lg:p-5 bg-white border border-gray-100 rounded-2xl"
            >
              <Link
                to={`/product/${item.product.slug}`}
                className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden bg-cream-100 shrink-0"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-xs text-primary-500 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <Link to={`/product/${item.product.slug}`}>
                      <h3 className="font-serif text-base lg:text-lg font-semibold text-gray-900 hover:text-primary-700 transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.product.size} · {item.product.strength}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 text-gray-600 hover:text-primary-700"
                      aria-label="Decrease"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-primary-700"
                      aria-label="Increase"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-serif text-lg font-semibold text-primary-800">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-50 rounded-2xl p-6 sticky top-28">
            <h2 className="font-serif text-xl font-semibold text-primary-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-primary-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>

              {subtotal < 75 && (
                <div className="flex items-center gap-2 text-xs text-primary-600 bg-primary-50 rounded-lg p-3">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Add {formatPrice(75 - subtotal)} more for free shipping</span>
                </div>
              )}

              <div className="border-t border-primary-200 pt-3 flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-serif text-2xl font-semibold text-primary-800">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all hover:shadow-lg"
            >
              Proceed to checkout
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              Secure checkout · Encrypted payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
