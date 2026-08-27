import { Footer, Header } from "../components";
import { SUPPORT_EMAIL, url } from "../site";

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="article-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href={url("/")}>Home</a>
        </nav>
        <article className="article">
          <h1>Privacy Policy</h1>
          <p className="intro">
            Swatchr: Color Picker does not collect, store, or transmit any
            personal information. There is no account, no backend and no sync.
            Last updated 27 August 2026.
          </p>

          <section>
            <h2>Camera</h2>
            <p>
              When you use the camera picker, Swatchr reads the color value of
              a single pixel from the live video feed. That value is used to
              draw the readout on screen and is discarded immediately. No frame
              is recorded, written to your photo library, or sent anywhere.
            </p>
          </section>

          <section>
            <h2>Photo library</h2>
            <p>
              When you pick a photo, Swatchr reads the color of the point you
              tap. The image stays on your device and is not copied or
              uploaded. Swatchr requests read access only for the image you
              select.
            </p>
          </section>

          <section>
            <h2>Saved colors</h2>
            <p>
              Your saved palette is stored on the device and is included in
              your normal encrypted device backup. It is not synced to a server
              and nobody else can see it.
            </p>
          </section>

          <section>
            <h2>Purchases</h2>
            <p>
              Swatchr offers a single one-time in-app purchase to unlock the
              saved palette, the Home Screen widget and export cards. The
              purchase is handled by Apple's StoreKit and by RevenueCat, the
              third-party service Swatchr uses to check whether the unlock is
              active. RevenueCat's privacy policy is at{" "}
              <a href="https://www.revenuecat.com/privacy/">
                revenuecat.com/privacy
              </a>
              . Payment itself is processed entirely by Apple. Swatchr never
              sees your payment details.
            </p>
          </section>

          <section>
            <h2>Analytics</h2>
            <p>
              Nothing directly. If you download Swatchr from the App Store,
              Apple may share aggregate, anonymised statistics with the
              developer as part of App Store Connect. That is governed by{" "}
              <a href="https://www.apple.com/legal/privacy/">
                Apple's privacy policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Children</h2>
            <p>
              Swatchr is not directed at children and does not knowingly
              collect information from anyone.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If a future version of Swatchr ever needs to collect or transmit
              data, this page will be updated before that version ships.
              Questions go to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
