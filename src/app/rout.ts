import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/product-editor-client'], // chặn crawler vào trang nhạy cảm
            },
        ],
        sitemap: 'https://tanlong.cameramattroi.com/sitemap.xml',
    }
}
