import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
    titleTemplate: '%s | NextMerce Clone',
    defaultTitle: 'NextMerce Clone',
    description: 'Giao diện thương mại điện tử Next.js, HTML5, CSS3, responsive, đa ngôn ngữ, chuẩn SEO.',
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: 'https://example.com',
        siteName: 'NextMerce Clone',
    },
    twitter: {
        handle: '@nextmerce',
        site: '@nextmerce',
        cardType: 'summary_large_image',
    },
}

export default config
