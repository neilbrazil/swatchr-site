import { guideBySlug, type Guide } from "../data";
import {
  CtaCallout,
  FaqItem,
  Footer,
  GuideCard,
  Header,
  Shot,
  StoreBadge,
} from "../components";
import { url } from "../site";

export default function GuidePage({ slug }: { slug: string }) {
  const g: Guide = guideBySlug(slug);

  return (
    <>
      <Header />

      <main className="article-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={url("/")}>Home</a>
          <span aria-hidden="true">/</span>
          <a href={url("guides/")}>Guides</a>
        </nav>

        <article className="article">
          <h1>{g.h1}</h1>

          <img
            className="feature-img"
            src={url(g.feature.src)}
            alt={g.feature.alt}
            width={g.feature.width}
            height={g.feature.height}
            loading="eager"
            fetchPriority="high"
          />

          <p className="intro">{g.intro}</p>

          {g.howto ? (
            <section className="howto">
              <h2>{g.howto.name}</h2>
              <ol>
                {g.howto.steps.map((s) => (
                  <li key={s.name}>
                    <strong>{s.name}.</strong> {s.text}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {g.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.paras.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {s.figure ? <Shot fig={s.figure} /> : null}
              {s.cta ? <CtaCallout>{s.cta.text}</CtaCallout> : null}
            </section>
          ))}

          <section className="guide-faq">
            <h2>Common questions</h2>
            {g.faq.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open />
            ))}
          </section>

          <section className="cta-band inline">
            <h2>Try it yourself</h2>
            <p>
              Swatchr reads the color of anything your camera can see, or any
              point in a photo, and hands you the hex, RGB, HSL and CMYK.
            </p>
            <StoreBadge />
          </section>
        </article>

        <section className="band">
          <h2>Related guides</h2>
          <div className="guide-grid">
            {g.related.map((slug) => (
              <GuideCard key={slug} guide={guideBySlug(slug)} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
