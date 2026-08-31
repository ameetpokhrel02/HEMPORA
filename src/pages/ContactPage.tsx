import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-cream-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-medium text-accent-600 uppercase tracking-widest">
            Get in touch
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-primary-900 mt-3 mb-4">
            We're here to help
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Questions about a product, your order, or anything else? Our team
            responds within one business day.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-primary-900 mb-6">
              Contact information
            </h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@hempora.life', desc: 'We reply within 24 hours' },
                { icon: Phone, label: 'Phone', value: '+1 (800) 555-0142', desc: 'Mon–Fri, 9am–6pm MST' },
                { icon: MapPin, label: 'Visit us', value: '1234 Hemp Lane, Boulder, CO 80301', desc: 'By appointment only' },
                { icon: Clock, label: 'Business hours', value: 'Monday – Friday: 9am – 6pm', desc: 'Saturday: 10am – 4pm' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-primary-700 font-medium">{item.value}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-cream-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">Need a quick answer?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Check our FAQ page for answers to common questions about shipping,
                lab results, and product usage.
              </p>
              <a
                href="#/faq"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '/faq';
                }}
                className="inline-flex items-center gap-2 text-primary-700 font-medium text-sm hover:text-primary-600"
              >
                Visit FAQ
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-cream-50 rounded-3xl p-6 lg:p-8">
            <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-6">
              Send us a message
            </h2>
            {sent ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary-900 mb-2">
                  Message sent!
                </h3>
                <p className="text-gray-600">We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
