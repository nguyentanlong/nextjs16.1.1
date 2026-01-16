// src/app/page.tsx
// import ProductGrid from '@/components/ProductGrid';
import ProductsHome from '@/components/ProductsHome';

async function getProducts() {
  const res = await fetch('https://api.tonkliplock1000.com', {
    cache: 'no-store', // luôn lấy dữ liệu mới, tốt cho SEO
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
      <h1>Trang chủ Tonkliplock Store</h1>
      <ProductsHome products={products} />
    </main>
  );
}
