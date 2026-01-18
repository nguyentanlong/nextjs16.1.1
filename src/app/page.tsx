// src/app/page.tsx
// import ProductGrid from '@/components/ProductGrid';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import Category from '@/components/Category';
import PopularCategory from '@/components/PopularCategory';
import ProductsHome from '@/components/ProductsHome';
import ReBanner from '@/components/ReBanner';
import Link from 'next/link';
// import ProductGrid from '@/components/ProductGrid';
async function getProducts() {
  const res = await fetch('https://api.tonkliplock1000.com', {
    next: { revalidate: 3600 }, // cache 1h
  });

  if (!res.ok) {
    throw new Error('Không thể fetch dữ liệu sản phẩm');
  }

  const json = await res.json();
  return json.data; // API của đệ trả về { data: [...] }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <Header />
      <HeroBanner />
      <Category />
      <PopularCategory />
      <ProductsHome products={products} />
      <Link href="/LoginPage" className="login-link">Đăng nhập</Link>
      <ReBanner />
    </main>
  );
}
