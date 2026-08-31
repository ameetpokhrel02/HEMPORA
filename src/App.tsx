import { RouterProvider, useRouter } from '@/context/RouterContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';

function Routes() {
  const { path } = useRouter();
  const cleanPath = path.split('?')[0];

  if (cleanPath === '/' || cleanPath === '') return <HomePage />;

  if (cleanPath === '/shop') return <ShopPage />;

  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '');
    return <ProductPage slug={slug} />;
  }

  if (cleanPath === '/cart') return <CartPage />;
  if (cleanPath === '/checkout') return <CheckoutPage />;
  if (cleanPath === '/about') return <AboutPage />;
  if (cleanPath === '/contact') return <ContactPage />;
  if (cleanPath === '/faq') return <FAQPage />;

  return <HomePage />;
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-1">
            <Routes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}
