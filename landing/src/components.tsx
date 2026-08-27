import type { ReactNode } from "react";
import { APP, type Figure, type Guide } from "./data";
import { APP_STORE_URL, SUPPORT_EMAIL, url } from "./site";

export function StoreBadge({ small }: { small?: boolean }) {
  return (
    <a
      className={small ? "store-badge store-badge--sm" : "store-badge"}
      href={APP_STORE_URL}
      aria-label={`Download ${APP.name} on the App Store`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.6zM14.3 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2z"
        />
      </svg>
      Download on the App Store
    </a>
  );
}

export function Header() {
  return (
    <header className="site-head">
      <a className="brand" href={url("/")}>
        <img
          src={url("assets/icon.png")}
          alt=""
          width={36}
          height={36}
          className="brand-mark"
        />
        <span>{APP.name}</span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href={url("/#features")}>Features</a>
        <a href={url("guides/")}>Guides</a>
        <a href={url("/#faq")}>FAQ</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-foot">
      <nav aria-label="Footer">
        <a href={url("/")}>Home</a>
        <a href={url("guides/")}>Guides</a>
        <a href={url("privacy/")}>Privacy Policy</a>
        <a href={`mailto:${SUPPORT_EMAIL}`}>Support</a>
      </nav>
      <p>
        {APP.fullName} is made by {APP.author}. Not affiliated with Apple Inc.
        App Store is a trademark of Apple Inc.
      </p>
    </footer>
  );
}

export function Shot({ fig, priority }: { fig: Figure; priority?: boolean }) {
  return (
    <figure className="shot">
      <img
        src={url(fig.src)}
        alt={fig.alt}
        width={fig.width}
        height={fig.height}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
      <figcaption>{fig.caption}</figcaption>
    </figure>
  );
}

export function CtaCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="cta-callout">
      <p>{children}</p>
      <StoreBadge small />
    </aside>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <a className="guide-card" href={url(`guides/${guide.slug}/`)}>
      <img
        className="guide-card-img"
        src={url(guide.feature.src)}
        alt={guide.feature.alt}
        width={guide.feature.width}
        height={guide.feature.height}
        loading="lazy"
      />
      <div className="guide-card-body">
        <h3>{guide.title}</h3>
        <p>{guide.description}</p>
        <span className="guide-card-more">Read the guide</span>
      </div>
    </a>
  );
}

export function FaqItem({
  q,
  a,
  guide,
  open,
}: {
  q: string;
  a: string;
  guide?: string;
  open?: boolean;
}) {
  return (
    <details className="faq-item" open={open}>
      <summary>{q}</summary>
      <div className="faq-answer">
        <p>{a}</p>
        {guide ? (
          <p>
            <a href={url(`guides/${guide}/`)}>Learn more</a>
          </p>
        ) : null}
      </div>
    </details>
  );
}
