/**
 * Opening for inner-page heroes: three bars, after the bars in the emblem, lift away in sequence to reveal the
 * photograph behind the headline. CSS only, so it never waits for JavaScript. It only plays on a direct load or refresh, never
 * when moving between pages, and is hidden for reduced motion and without JavaScript (see globals.css).
 * Place inside a hero with `isolate`, after its background layers.
 */
export function HeroBars() {
  return (
    <div aria-hidden className="hero-bars">
      <span />
      <span />
      <span />
    </div>
  );
}
