import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { Leaf, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Header() {
  const { path } = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const navLinks = [
    { to: '/shop', label: 'Shop All' },
    ...CATEGORIES.map((c) => ({ to: `/shop?category=${c.id}`, label: c.label })),
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary-700 text-cream-100 text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide">
        Free shipping on orders over $75 — Lab-tested, organically grown hemp
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="leading-none">
                <span className="font-serif text-lg lg:text-xl font-semibold text-primary-800 block">
                  Hempora
                </span>
                <span className="text-[10px] lg:text-xs text-primary-500 tracking-widest uppercase">
                  Pure Life
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/shop"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  path.startsWith('/shop')
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                }`}
              >
                Shop All
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  to={`/shop?category=${c.id}`}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  path === '/about'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                }`}
              >
                About
              </Link>
              <Link
                to="/faq"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  path === '/faq'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                }`}
              >
                FAQ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/shop"
                className="p-2 text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-primary-100 bg-white animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/faq"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
