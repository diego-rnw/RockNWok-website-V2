/* global React */
const { useEffect, useRef, useState } = React;

// Hook: reveal-on-scroll using IntersectionObserver
function useReveal(rootMargin = "-10% 0px") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

window.useReveal = useReveal;

/* =============== NAV =============== */
function Nav({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="nav__brand" href="#top">
        <img className="nav__brand-logo" src="assets/logo.svg" alt="Rock N Wok" />
      </a>
      <div className="nav__links">
        <a className="nav__link" href="#experiencia">Experiencia</a>
        <a className="nav__link" href="#sistema">Sistema</a>
        <a className="nav__link" href="#novedades">Novedades</a>
        <a className="nav__link" href="#sucursales">Sucursales</a>
        <button className="nav__cta" onClick={onReserve}>Reservar</button>
      </div>
    </nav>
  );
}
window.Nav = Nav;

/* =============== HERO =============== */
function Hero({ techIntensity, copy }) {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => heroRef.current?.classList.add("is-loaded"), 60);
    return () => clearTimeout(t);
  }, []);

  // Track scroll progress within the hero — 0 at top, 1 fully scrolled past.
  // Listen on document scroll too, since the iframe's window may not always fire.
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      const sy = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const p = Math.max(0, Math.min(1, sy / (h * 0.9)));
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="hero section--hero" id="experiencia" ref={heroRef}>
      <div className="hero__bg">
        <img className="hero__img" src="assets/hero-comedor.png" alt="Rock N Wok dining room with gold WOK YOUR SPIRIT wall" />
      </div>
      <div className="hero__veil" />
      <window.TechOverlay intensity={techIntensity} />
      <div className="hero__vignette" />

      <div className="hero__wall-text">
        <h1 className="hero__wall-heading">WOK YOUR SPIRIT</h1>
      </div>

      <div className="hero__content hero__content--left-anchored">
        <div className="hero__copy">
          <span className="eyebrow reveal is-visible">{copy.heroEyebrow}</span>
          <p className="hero__lede">{copy.heroSub}</p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="https://pide.rockandwok.com" target="_blank" rel="noopener noreferrer">
              {copy.heroCtaPrimary}
              <span className="btn__icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
            {copy.heroCtaSecondary && (
              <button className="btn btn--ghost" type="button">
                <span className="btn__icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 1.5v9l8-4.5-8-4.5z" fill="currentColor"/></svg>
                </span>
                {copy.heroCtaSecondary}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hero__meta">
        <div className="hero__meta-row">
          <span>EST. 2024</span>
          <span>·</span>
          <span>CDMX · MX</span>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
