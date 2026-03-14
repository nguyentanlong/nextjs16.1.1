import ProductsHome from "@/components/ProductsHome";
import { fetchRelatedProductsLocal } from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unwrap Promise
  const { slug } = await params;

  // slug dạng "dien-thoai-3.html"
  const rawSlug = slug.replace(".html", "");
  const parts = rawSlug.split("-");
  const subCategoryId = Number(parts[parts.length - 1]);
  const slugName = parts.slice(0, -1).join("-");

  // console.log("slugName 👉", slugName);
  // console.log("subCategoryId 👉", subCategoryId);

  const products = await fetchRelatedProductsLocal(subCategoryId);

  return (
    <ProductsHome products={products} />
  );
}
