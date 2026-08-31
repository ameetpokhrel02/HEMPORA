import { Link } from '@/context/RouterContext';
import { Leaf, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-cream-100">
      {/* Newsletter */}
      <div className="border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold mb-2">
                Join the Hempora community
              </h3>
              <p className="text-primary-200 text-sm lg:text-base">
                Get wellness tips, exclusive offers, and 15% off your first order.
              </p>
            </div>
            <form
              className="flex gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-primary-800 text-white placeholder-primary-300 border border-primary-700 focus:outline-none focus:border-accent-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold rounded-full transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="leading-none">
                <span className="font-serif text-xl font-semibold block">
                  Hempora
                </span>
                <span className="text-xs text-primary-300 tracking-widest uppercase">
                  Pure Life
                </span>
              </div>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed mb-4">
              Premium hemp wellness products, organically grown and third-party lab tested for purity and potency.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors"
                  aria-label="Social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-accent-500">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-primary-200 hover:text-white text-sm transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/shop?category=${c.id}`}
                    className="text-primary-200 hover:text-white text-sm transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-accent-500">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-200 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Lab Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-accent-500">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-200 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>hello@hempora.life</span>
              </li>
              <li className="flex items-start gap-3 text-primary-200 text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>+1 (800) 555-0142</span>
              </li>
              <li className="flex items-start gap-3 text-primary-200 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Boulder, Colorado</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-300 text-xs text-center sm:text-left">
            © 2026 Hempora Pure Life. These statements have not been evaluated by the FDA.
          </p>
          <div className="flex gap-6">
            <a href="#/" onClick={(e) => e.preventDefault()} className="text-primary-300 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#/" onClick={(e) => e.preventDefault()} className="text-primary-300 hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
