import { GUIDES } from "../data";
import { Footer, GuideCard, Header, StoreBadge } from "../components";
import { url } from "../site";

export default function GuidesIndex() {
  return (
    <>
      <Header />
      <main className="article-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={url("/")}>Home</a>
        </nav>
        <h1>Color picker guides</h1>
        <p className="intro">
          Eight short guides covering the things people actually want a color
          app for: getting a hex code off a photo, reading CMYK before a print
          job, finding a color that goes with another one, and keeping the
          results somewhere you can find them again.
        </p>
        <div className="guide-grid">
          {GUIDES.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
        <section className="cta-band inline">
          <h2>Get Swatchr</h2>
          <p>Free download, no account, works offline.</p>
          <StoreBadge />
        </section>
      </main>
      <Footer />
    </>
  );
}
