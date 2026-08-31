import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, CATEGORIES } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useRouter } from '@/context/RouterContext';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const { path } = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const query = useMemo(() => {
    const qs = path.split('?')[1];
    if (!qs) return new URLSearchParams();
    return new URLSearchParams(qs);
  }, [path]);

  const selectedCategory = query.get('category') || 'all';
  const searchQuery = query.get('q') || '';

  const [priceRange, setPriceRange] = useState<'all' | 'under-50' | '50-75' | 'over-75'>('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      let dbQuery = supabase.from('products').select('*');
      if (selectedCategory !== 'all') {
        dbQuery = dbQuery.eq('category', selectedCategory);
      }
      if (searchQuery) {
        dbQuery = dbQuery.ilike('name', `%${searchQuery}%`);
      }
      const { data, error } = await dbQuery.order('rating', { ascending: false });
      if (!error && data) setProducts(data);
      else setProducts([]);
      setLoading(false);
    })();
  }, [selectedCategory, searchQuery]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (priceRange === 'under-50') result = result.filter((p) => p.price < 50);
    else if (priceRange === '50-75') result = result.filter((p) => p.price >= 50 && p.price <= 75);
    else if (priceRange === 'over-75') result = result.filter((p) => p.price > 75);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, priceRange, sortBy]);

  const currentCategoryLabel =
    CATEGORIES.find((c) => c.id === selectedCategory)?.label ||
    'All Products';

  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-br from-primary-50 to-cream-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <nav className="text-sm text-primary-500 mb-3">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-primary-800 font-medium">{currentCategoryLabel}</span>
          </nav>
          <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-primary-900">
            {currentCategoryLabel}
          </h1>
          <p className="text-primary-600 mt-3 text-base lg:text-lg max-w-2xl">
            Premium hemp wellness products, organically grown and third-party lab tested for purity and potency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <FilterSection
                title="Category"
                current={selectedCategory}
                onCategoryChange={(cat) => {
                  window.location.hash = cat === 'all' ? '/shop' : `/shop?category=${cat}`;
                }}
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All prices' },
                    { id: 'under-50', label: 'Under $50' },
                    { id: '50-75', label: '$50 to $75' },
                    { id: 'over-75', label: 'Over $75' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        value={opt.id}
                        checked={priceRange === opt.id}
                        onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
                        className="w-4 h-4 accent-primary-600"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-primary-700">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <span className="text-sm text-gray-500">
                  {loading ? 'Loading...' : `${filtered.length} products`}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-primary-300 transition-colors"
                >
                  Sort: {SORT_OPTIONS.find((o) => o.id === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-52 py-2 animate-fade-in">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${
                          sortBy === opt.id ? 'text-primary-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products grid */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-6 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white p-6 overflow-y-auto animate-slide-in-right" style={{ animation: 'slide-in-right 0.3s ease-out forwards', transform: 'translateX(0)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSection
              title="Category"
              current={selectedCategory}
              onCategoryChange={(cat) => {
                window.location.hash = cat === 'all' ? '/shop' : `/shop?category=${cat}`;
                setShowMobileFilters(false);
              }}
            />
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All prices' },
                  { id: 'under-50', label: 'Under $50' },
                  { id: '50-75', label: '$50 to $75' },
                  { id: 'over-75', label: 'Over $75' },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      value={opt.id}
                      checked={priceRange === opt.id}
                      onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
                      className="w-4 h-4 accent-primary-600"
                    />
                    <span className="text-sm text-gray-600">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({
  title,
  current,
  onCategoryChange,
}: {
  title: string;
  current: string;
  onCategoryChange: (cat: string) => void;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name="category"
            checked={current === 'all'}
            onChange={() => onCategoryChange('all')}
            className="w-4 h-4 accent-primary-600"
          />
          <span className="text-sm text-gray-600 group-hover:text-primary-700">
            All Products
          </span>
        </label>
        {CATEGORIES.map((c) => (
          <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={current === c.id}
              onChange={() => onCategoryChange(c.id)}
              className="w-4 h-4 accent-primary-600"
            />
            <span className="text-sm text-gray-600 group-hover:text-primary-700">
              {c.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
