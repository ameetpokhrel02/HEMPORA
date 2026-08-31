import { Link } from '@/context/RouterContext';
import {
  Leaf,
  Heart,
  ShieldCheck,
  FlaskConical,
  Award,
  Sprout,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-cream-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-primary-900 mt-3 mb-6 max-w-3xl mx-auto leading-tight">
            Rooted in nature, grown with intention
          </h1>
          <p className="text-lg lg:text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed">
            Hempora was born from a simple belief: nature holds the power to help us
            live better. We craft premium hemp wellness products with uncompromising
            quality and radical transparency.
          </p>
        </div>
      </section>

      {/* Image + story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.pexels.com/photos/33325757/pexels-photo-33325757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Hemp field"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
              How it started
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2 mb-6">
              From a family farm in Colorado
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In 2018, our founder watched a loved one struggle with everyday stress
              and sleepless nights. After discovering the benefits of hemp extract but
              being underwhelmed by the products on the market, she decided to grow
              her own.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What started as a small family farm in Boulder, Colorado has grown into
              Hempora — a wellness brand trusted by thousands. But our roots haven't
              changed: we still grow organically, extract cleanly, and test every batch.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe wellness shouldn't be complicated or opaque. That's why we
              share our lab results, list every ingredient, and make products we're
              proud to use ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-widest">
              What we stand for
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold mt-2">
              Our core values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sprout, title: 'Organic from the start', desc: 'We grow our hemp without pesticides, herbicides, or synthetic fertilizers. Just sun, soil, and care.' },
              { icon: FlaskConical, title: 'Radical transparency', desc: 'Every product is third-party lab tested. We publish results so you know exactly what you\'re getting.' },
              { icon: ShieldCheck, title: 'Purity guaranteed', desc: 'No fillers, no artificial additives, no shortcuts. Clean CO₂ extraction preserves the full spectrum.' },
              { icon: Heart, title: 'People over profit', desc: 'Wellness should be accessible. We keep our prices fair and our quality high.' },
              { icon: Leaf, title: 'Sustainable practices', desc: 'From regenerative farming to recyclable packaging, we tread lightly on the planet.' },
              { icon: Award, title: 'Uncompromising quality', desc: 'We\'d rather make less and make it right. Every product meets our highest standards.' },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-primary-700/50 rounded-2xl p-6 lg:p-8 border border-primary-600"
              >
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-900" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-primary-200 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Our Process
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mt-2">
            From seed to shelf
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {[
            { step: '01', title: 'Organic Cultivation', desc: 'Hemp seeds planted in nutrient-rich Colorado soil, grown without chemicals.' },
            { step: '02', title: 'Clean Extraction', desc: 'CO₂ extraction preserves the full spectrum of cannabinoids and terpenes.' },
            { step: '03', title: 'Lab Testing', desc: 'Every batch tested by independent labs for potency, purity, and safety.' },
            { step: '04', title: 'Delivered to You', desc: 'Carefully packaged and shipped to your door with full transparency.' },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-5xl font-serif font-semibold text-primary-200 mb-3">
                {item.step}
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-50 to-cream-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-900 mb-4">
            Ready to feel the difference?
          </h2>
          <p className="text-lg text-primary-600 mb-8">
            Join thousands who've made Hempora part of their daily wellness routine.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all hover:shadow-lg"
          >
            Shop our products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
