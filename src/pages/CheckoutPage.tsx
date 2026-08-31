import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice, OrderItem } from '@/types';
import { supabase } from '@/lib/supabase';
import { Link, useRouter } from '@/context/RouterContext';
import { Check, ShieldCheck, Lock, CreditCard, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { navigate } = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    card_number: '',
    card_expiry: '',
    card_cvc: '',
  });

  const shipping = subtotal >= 75 ? 0 : 6.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setError(null);

    const orderItems: OrderItem[] = items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      qty: i.quantity,
      image: i.product.image_url,
    }));

    const { data, error: dbError } = await supabase
      .from('orders')
      .insert({
        full_name: form.full_name,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        total: total,
        status: 'pending',
        items: orderItems,
      })
      .select('id')
      .single();

    if (dbError) {
      setError('Something went wrong placing your order. Please try again.');
      setSubmitting(false);
      return;
    }

    setOrderId(data.id);
    setSuccess(true);
    clearCart();
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <Check className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mb-4">
            Order confirmed!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Thank you for your purchase. A confirmation email is on its way.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Order number: <span className="font-mono font-medium text-primary-700">{orderId?.slice(0, 8)}</span>
          </p>

          <div className="bg-cream-50 rounded-2xl p-6 text-left mb-8">
            <h2 className="font-semibold text-gray-900 mb-3">What happens next?</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                We'll process your order within 1 business day
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                You'll receive tracking info via email
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                Free shipping on all orders over $75
              </li>
            </ul>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all"
          >
            Continue shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="font-serif text-2xl font-semibold text-primary-900 mb-4">
          Your cart is empty
        </h1>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                value={form.full_name}
                onChange={(v) => update('full_name', v)}
                required
                className="sm:col-span-2"
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                required
                className="sm:col-span-2"
              />
              <Input
                label="Street address"
                value={form.address}
                onChange={(v) => update('address', v)}
                required
                className="sm:col-span-2"
              />
              <Input
                label="City"
                value={form.city}
                onChange={(v) => update('city', v)}
                required
              />
              <Input
                label="State"
                value={form.state}
                onChange={(v) => update('state', v)}
                required
              />
              <Input
                label="ZIP code"
                value={form.zip}
                onChange={(v) => update('zip', v)}
                required
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold text-gray-900">
                Payment
              </h2>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Lock className="w-4 h-4" />
                Secure & encrypted
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Card number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={form.card_number}
                    onChange={(e) => update('card_number', e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                  />
                </div>
              </div>
              <Input
                label="Expiry date"
                placeholder="MM/YY"
                value={form.card_expiry}
                onChange={(v) => update('card_expiry', v)}
                required
              />
              <Input
                label="CVC"
                placeholder="123"
                value={form.card_cvc}
                onChange={(v) => update('card_cvc', v)}
                required
              />
            </div>

            <p className="text-xs text-gray-400 mt-4">
              This is a demo checkout — no real payment will be processed.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-50 rounded-2xl p-6 sticky top-28">
            <h2 className="font-serif text-xl font-semibold text-primary-900 mb-6">
              Your Order
            </h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-primary-200 pt-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-primary-200 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-serif text-2xl font-semibold text-primary-800">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all hover:shadow-lg disabled:opacity-60"
            >
              {submitting ? 'Processing...' : `Pay ${formatPrice(total)}`}
              {!submitting && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              256-bit SSL encrypted
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
      />
    </div>
  );
}
