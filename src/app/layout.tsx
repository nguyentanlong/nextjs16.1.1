import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thi công điện nước, camera giám sát, năng lượng mặt trời, cơ điện',
  description: 'Thi công điện nước dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, cơ điện trên địa bàn HCM, Bình Dương, Đồng Nai, Tây Ninh, Vũng Tàu, Bình Phước, DakNong, DakLak...',
  metadataBase: new URL('https://example.com'),
}

async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch {
    return null
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale?: string }
}) {
  const locale = params?.locale ?? 'vi'
  const messages = await getMessages(locale)
  if (!messages) notFound()

  return (
    <html lang={locale}>
      <head>
        {/* next-seo default */}
      </head>
      <body>
        <DefaultSeo
          titleTemplate="%s | NextMerce Clone"
          openGraph={{
            type: 'website',
            locale,
            siteName: 'NextMerce Clone',
          }}
          twitter={{ cardType: 'summary_large_image' }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
