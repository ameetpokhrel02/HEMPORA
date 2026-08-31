import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from '@/context/RouterContext';

const FAQS = [
  {
    category: 'Products',
    questions: [
      {
        q: 'What is full-spectrum hemp extract?',
        a: 'Full-spectrum extract contains all the naturally occurring compounds found in the hemp plant, including cannabinoids, terpenes, and flavonoids. This creates an "entourage effect" where the compounds work together for enhanced benefits compared to isolated CBD alone.',
      },
      {
        q: 'Will your products make me feel "high"?',
        a: 'No. Our products are made from legally compliant hemp and contain less than 0.3% THC. This trace amount is not enough to produce psychoactive effects. You may feel calm or relaxed, but not impaired.',
      },
      {
        q: 'How do I choose the right product for me?',
        a: 'It depends on your goals. For daily calm, try our tinctures. For sleep, our melatonin-infused gummies are popular. For targeted relief, our topical creams work well. If you\'re unsure, start with a lower potency and adjust as needed.',
      },
      {
        q: 'How much should I take?',
        a: 'Dosage varies by individual and product. We recommend starting with the suggested serving on the label and adjusting gradually. For tinctures, start with 1 dropper (1ml) daily. Consult your healthcare provider if you have specific concerns.',
      },
    ],
  },
  {
    category: 'Lab Testing & Quality',
    questions: [
      {
        q: 'Are your products third-party lab tested?',
        a: 'Yes. Every batch is tested by independent, ISO-certified laboratories. We test for cannabinoid potency, pesticides, heavy metals, microbial contamination, and residual solvents to ensure safety and accuracy.',
      },
      {
        q: 'Where can I find lab results?',
        a: 'Lab results (Certificates of Analysis) are available for every product. You can find them linked on each product page, or contact us with your batch number and we\'ll send them directly.',
      },
      {
        q: 'Are your products organic?',
        a: 'Our hemp is grown using organic practices on our family farm in Colorado. We do not use pesticides, herbicides, or synthetic fertilizers. Our facilities follow Good Manufacturing Practices (GMP).',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Orders are processed within 1 business day. Standard shipping takes 3–5 business days within the US. You\'ll receive a tracking number by email once your order ships.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes, we offer free standard shipping on all orders over $75 within the United States. Orders under $75 ship for a flat rate of $6.95.',
      },
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day satisfaction guarantee. If you\'re not happy with your purchase, contact us within 30 days for a full refund (minus shipping). Products must be returned in their original packaging.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within the United States. We\'re working on expanding to additional countries — sign up for our newsletter to be notified when international shipping becomes available.',
      },
    ],
  },
  {
    category: 'Safety & Legal',
    questions: [
      {
        q: 'Is hemp-derived CBD legal?',
        a: 'Yes. The 2018 Farm Bill legalized hemp and hemp-derived products containing less than 0.3% THC at the federal level. However, laws vary by state, so we recommend checking your local regulations.',
      },
      {
        q: 'Can I take CBD with other medications?',
        a: 'CBD can interact with certain medications. If you take prescription drugs, are pregnant, nursing, or have a medical condition, consult your healthcare provider before using hemp products.',
      },
      {
        q: 'Will CBD show up on a drug test?',
        a: 'Our full-spectrum products contain trace amounts of THC (less than 0.3%). While unlikely, it is possible for this to trigger a positive result on sensitive drug tests. If you are subject to testing, consider our THC-free options or consult your employer.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('0-0');

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-cream-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-primary-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Everything you need to know about our products, quality standards,
            shipping, and more.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-12">
          {FAQS.map((section, sIdx) => (
            <div key={section.category}>
              <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-6 pb-3 border-b border-primary-100">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => {
                  const id = `${sIdx}-${qIdx}`;
                  const isOpen = openId === id;
                  return (
                    <div
                      key={id}
                      className={`border rounded-2xl overflow-hidden transition-all ${
                        isOpen
                          ? 'border-primary-300 bg-cream-50'
                          : 'border-gray-100 bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setOpenId(isOpen ? null : id)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-medium text-gray-900 text-sm lg:text-base">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary-500 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center bg-cream-50 rounded-3xl p-8 lg:p-10">
          <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is happy to help. Reach out and we'll get back to you within one business day.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
