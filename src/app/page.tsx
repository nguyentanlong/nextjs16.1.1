// src/app/page.tsx
// import ProductGrid from '@/components/ProductGrid';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import Category from '@/components/Category';
import PopularCategory from '@/components/PopularCategory';
import ProductsHome from '@/components/ProductsHome';
import ReBanner from '@/components/ReBanner';
// import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import Footer from '@/components/Footer';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main>
      <Header />
      <HeroBanner />
      <Category />
      <PopularCategory />
      <ProductsHome products={products} />
      {/* <Link href="/login" className="login-link">Đăng nhập</Link> */}
      <ReBanner />
      <Footer />
    </main>
  );
}
