import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, CATEGORIES } from '@/types';
import { Link } from '@/context/RouterContext';
import ProductCard from '@/components/ProductCard';
import {
  Leaf,
  ShieldCheck,
  FlaskConical,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Moon,
} from 'lucide-react';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('rating', { ascending: false })
        .limit(8);
      if (!error && data) setFeatured(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-cream-50 to-primary-100">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/9616325/pexels-photo-9616325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-primary-700">
                Organically grown · Third-party lab tested
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary-900 leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Pure hemp,<br />naturally better living
            </h1>
            <p className="text-lg lg:text-xl text-primary-700 leading-relaxed mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover premium hemp wellness products crafted with organically grown,
              full-spectrum extracts. Feel the difference nature makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:scale-105"
              >
                Shop All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur hover:bg-white text-primary-700 font-semibold rounded-full border border-primary-200 transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Leaf, title: 'Organically Grown', desc: 'Sustainable farms' },
              { icon: FlaskConical, title: 'Lab Tested', desc: 'Full transparency' },
              { icon: ShieldCheck, title: 'Pure & Safe', desc: 'No fillers, no additives' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 lg:gap-4">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Explore
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {[
            { id: 'tinctures', label: 'Tinctures & Oils', icon: Heart },
            { id: 'gummies', label: 'Gummies & Edibles', icon: Sparkles },
            { id: 'topicals', label: 'Topicals & Creams', icon: Leaf },
            { id: 'capsules', label: 'Capsules', icon: Award },
            { id: 'flower', label: 'Hemp Flower', icon: Zap },
          ].map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-serif text-sm lg:text-base font-semibold text-primary-800 leading-tight">
                  {cat.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-cream-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
                Best Sellers
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2">
                Customer Favorites
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-600 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12 sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-full"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness needs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Find Your Balance
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2">
            Shop by Wellness Goal
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Heart,
              title: 'Calm & Balance',
              desc: 'Find your daily center with tinctures and gummies designed to ease stress and promote calm.',
              link: '/shop?category=tinctures',
              img: 'https://images.pexels.com/photos/3756001/pexels-photo-3756001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            },
            {
              icon: Moon,
              title: 'Sleep & Recovery',
              desc: 'Drift into restful sleep and wake restored with our melatonin-infused nighttime formulas.',
              link: '/shop?category=gummies',
              img: 'https://images.pexels.com/photos/30801239/pexels-photo-30801239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            },
            {
              icon: Zap,
              title: 'Relief & Recovery',
              desc: 'Soothe muscles and joints with targeted topicals and high-potency capsules for fast relief.',
              link: '/shop?category=topicals',
              img: 'https://images.pexels.com/photos/6442511/pexels-photo-6442511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base text-white/90 leading-relaxed mb-3">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 group-hover:gap-3 transition-all">
                  Shop now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Farm-to-bottle story */}
      <section className="bg-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/33325761/pexels-photo-33325761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Hemp farm"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-widest">
                Our Promise
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-6 mt-2">
                From seed to shelf, purity you can trust
              </h2>
              <p className="text-primary-200 text-lg leading-relaxed mb-8">
                Every Hempora product starts with organically grown hemp from our
                family farms in Colorado. We use clean CO₂ extraction, test every
                batch in third-party labs, and never use fillers or artificial
                additives. What you see is what you get — pure, potent, honest.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'USDA organic hemp, grown in Colorado',
                  'Clean CO₂ extraction — no solvents, no fillers',
                  'Every batch third-party lab tested',
                  'Full-spectrum extracts with natural terpenes',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-primary-900" />
                    </div>
                    <span className="text-primary-100">{point}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-800 font-semibold rounded-full hover:bg-cream-100 transition-colors"
              >
                Learn our story
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Reviews
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2">
            Loved by thousands
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              quote: 'The Pure Calm tincture has genuinely changed my daily routine. I feel more balanced and centered than I have in years.',
              name: 'Sarah M.',
              role: 'Verified buyer',
            },
            {
              quote: 'Sleep Well gummies are a game-changer. I fall asleep faster and wake up feeling actually rested. No grogginess at all.',
              name: 'James K.',
              role: 'Verified buyer',
            },
            {
              quote: 'The muscle relief cream works wonders after long runs. Fast absorbing, no greasy residue, and it actually helps.',
              name: 'Elena R.',
              role: 'Verified buyer',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-cream-50 rounded-2xl p-6 lg:p-8 border border-primary-100"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-accent-500 text-accent-500" viewBox="0 0 20 20">
                    <path d="M10 1l2.6 5.9 6.4.5-4.9 4.2 1.5 6.3L10 14.8 4.4 17.9l1.5-6.3L1 7.4l6.4-.5L10 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-serif">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-primary-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
