// src/app/page.tsx

import HeroBanner from '@/components/HeroBanner';
import Category from '@/components/Category';
import PopularCategory from '@/components/PopularCategory';
import ProductsHome from '@/components/ProductsHome';
import ReBanner from '@/components/ReBanner';
import { fetchProducts } from '@/lib/api';
import Header from '@/components/Header';
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/Footer';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main>

      <HeroBanner />
      <Category />
      <PopularCategory />
      <ProductsHome products={products} />
      <ReBanner />
      {/* <Footer /> */}
    </main>
  );
}
