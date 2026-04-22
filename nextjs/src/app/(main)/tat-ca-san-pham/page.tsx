
import ProductsAll from "@/components/ProductsAll";
import { fetchAllProducts } from "@/lib/api";
export default async function AllProduct() {
    const productAll = await fetchAllProducts();
    if (!productAll || productAll.length === 0) {
        return <div>Chưa có sản phẩm nào</div>;
    }
    return (
        <><ProductsAll /></>);
}