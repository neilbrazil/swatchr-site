import { Footer, Header } from "../components";
import { SUPPORT_EMAIL, url } from "../site";

const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export default function Terms() {
  return (
    <>
      <Header />
      <main className="article-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={url("/")}>Home</a>
        </nav>
        <article className="article">
          <h1>Terms of Use</h1>
          <p className="intro">
            Swatchr is licensed to you under Apple's{" "}
            <a href={APPLE_EULA}>
              Licensed Application End User License Agreement
            </a>{" "}
            (the Standard EULA). This page summarises how it applies to the app
            and its one in-app purchase. Last updated 8 October 2026.
          </p>

          <section>
            <h2>The app</h2>
            <p>
              Picking colors from the camera or a photo, every color format and
              copying values are free, with no time limit. There is no account,
              no backend and no sync.
            </p>
          </section>

          <section>
            <h2>Swatchr Pro</h2>
            <p>
              Swatchr Pro is a single, non-consumable in-app purchase. It
              unlocks the saved palette and Library, the Home Screen widget and
              shareable color cards. It is not a subscription: you pay once, it
              never renews and there is nothing to cancel.
            </p>
            <p>
              Payment is charged to your Apple Account at confirmation of
              purchase. Pro is available on every device signed in to the same
              Apple Account, and you can restore it at any time from Settings in
              the app. Refunds are handled by Apple at{" "}
              <a href="https://reportaproblem.apple.com/">
                reportaproblem.apple.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Color accuracy</h2>
            <p>
              Color values are read from your camera or image and depend on
              lighting, the camera and the display. Color names are
              approximate. Check critical matches, such as paint or print,
              against a physical sample.
            </p>
          </section>

          <section>
            <h2>Privacy</h2>
            <p>
              How Swatchr handles camera, photo and purchase data is set out in
              the <a href={url("privacy/")}>Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms go to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
