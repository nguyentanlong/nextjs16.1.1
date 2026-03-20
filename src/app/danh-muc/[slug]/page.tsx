import ProductsHomeClientSub from "@/components/ProductsHomeClientSub";
import { fetchProductsBySubCategory } from "@/lib/api";


export default async function CategoryPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;

    const res = await fetchProductsBySubCategory(slug, 1, 10);

    return (
        <ProductsHomeClientSub
            initialProducts={res.data}
            total={res.total}
            slug={slug} // 🔥 thêm
        />
    );
}