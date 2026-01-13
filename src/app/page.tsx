import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('home')

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero">
        <div className="hero__content">
          <h1>{t('hero.title')}</h1>
          <p className="subtitle">{t('hero.subtitle')}</p>
          <a className="btn btn--primary" href="/shop">{t('hero.cta')}</a>
        </div>
        <div className="hero__image" aria-hidden="true" />
      </section>

      {/* Benefits */}
      <section className="benefits">
        <article className="benefit">
          <h3>{t('benefits.shipping.title')}</h3>
          <p>{t('benefits.shipping.desc')}</p>
        </article>
        <article className="benefit">
          <h3>{t('benefits.returns.title')}</h3>
          <p>{t('benefits.returns.desc')}</p>
        </article>
        <article className="benefit">
          <h3>{t('benefits.payments.title')}</h3>
          <p>{t('benefits.payments.desc')}</p>
        </article>
        <article className="benefit">
          <h3>{t('benefits.support.title')}</h3>
          <p>{t('benefits.support.desc')}</p>
        </article>
      </section>

      {/* Categories */}
      <section className="categories">
        <header className="section__header">
          <h2>{t('categories.title')}</h2>
        </header>
        <div className="grid grid--4">
          {['laptop', 'watch', 'mobile', 'health', 'home', 'games', 'tv'].map((key) => (
            <a key={key} className="category" href={`/category/${key}`}>
              <div className="category__thumb" />
              <span className="category__label">{t(`categories.${key}`)}</span>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products">
        <header className="section__header">
          <h2>{t('newArrivals.title')}</h2>
          <a className="link" href="/new">{t('viewAll')}</a>
        </header>
        <div className="grid grid--4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <article key={id} className="product">
              <div className="product__thumb" />
              <h3 className="product__title">{t('product.sampleTitle')}</h3>
              <div className="product__price">
                <span className="price price--sale">$777</span>
                <span className="price price--old">$888</span>
              </div>
              <button className="btn btn--outline">{t('addToCart')}</button>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>{t('newsletter.title')}</h2>
        <p className="subtitle">{t('newsletter.subtitle')}</p>
        <form className="newsletter__form" action="/api/subscribe" method="post">
          <input
            type="email"
            name="email"
            placeholder={t('newsletter.placeholder')}
            aria-label={t('newsletter.placeholder')}
            required
          />
          <button className="btn btn--primary" type="submit">{t('newsletter.cta')}</button>
        </form>
      </section>
    </main>
  )
}