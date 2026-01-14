// src/app/product/[id]/page.tsx
import type { Metadata } from 'next'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetch(`https://api.tonkliplock1000.com/`).then(res => res.json())//sau .com/${params.id}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  }
}

export default function ProductPage({ params }: Props) {
  return <h1>Chi tiết sản phẩm {params.id}</h1>
}
