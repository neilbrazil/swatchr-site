import {
  APP,
  FAQ,
  FEATURES,
  GUIDES,
  HOW_IT_WORKS,
  SCREENS,
} from "../data";
import {
  FaqItem,
  Footer,
  GuideCard,
  Header,
  Shot,
  StoreBadge,
} from "../components";
import { url } from "../site";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <img
              className="hero-icon"
              src={url("assets/icon.png")}
              alt=""
              width={88}
              height={88}
            />
            <h1>Color picker for your iPhone camera and photos</h1>
            <p className="lede">
              Point Swatchr at anything and read its color as hex, RGB, HSL and
              CMYK on one card. Tap the format you need and it goes to the
              clipboard.
            </p>
            <StoreBadge />
            <p className="hero-note">
              Free download. {APP.minOS} or later. No account, works offline.
            </p>
          </div>
          <div className="hero-shot">
            <Shot fig={SCREENS[0]} priority />
          </div>
        </section>

        <section id="features" className="band">
          <h2>What Swatchr does</h2>
          <ul className="feature-grid">
            {FEATURES.map((f) => (
              <li key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="how" className="band">
          <h2>How it works</h2>
          <ol className="steps">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.n}>
                <span className="step-n" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="screens" className="band">
          <h2>A look at the app</h2>
          <div className="shot-row">
            {SCREENS.slice(1).map((s) => (
              <Shot key={s.src} fig={s} />
            ))}
          </div>
        </section>

        <section id="guides" className="band">
          <h2>Guides</h2>
          <p className="band-lede">
            Short, practical answers to the color questions that send people
            looking for an app in the first place.
          </p>
          <div className="guide-grid">
            {GUIDES.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>

        <section id="faq" className="band">
          <h2>Questions</h2>
          <div className="faq">
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} {...f} open={i === 0} />
            ))}
          </div>
        </section>

        <section className="band cta-band">
          <h2>Get Swatchr</h2>
          <p>
            The camera picking, the photo picking and all four format codes are
            free with no usage limit. One purchase adds the saved palette, the
            widget and export cards.
          </p>
          <StoreBadge />
        </section>
      </main>

      <Footer />
    </>
  );
}
