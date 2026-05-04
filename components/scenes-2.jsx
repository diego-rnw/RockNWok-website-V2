/* global React */
const { useEffect, useRef, useState } = React;

/* =============== NOVEDADES (cinematic rail) =============== */
function Novedades({ copy }) {
  const railRef = useRef(null);
  const headRef = window.useReveal();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateBtns = () => {
    const r = railRef.current;
    if (!r) return;
    setCanPrev(r.scrollLeft > 4);
    setCanNext(r.scrollLeft + r.clientWidth < r.scrollWidth - 4);
  };
  useEffect(() => {
    const r = railRef.current;
    if (!r) return;
    updateBtns();
    r.addEventListener("scroll", updateBtns, { passive: true });
    window.addEventListener("resize", updateBtns);
    return () => {
      r.removeEventListener("scroll", updateBtns);
      window.removeEventListener("resize", updateBtns);
    };
  }, []);
  const scrollBy = (dir) => {
    const r = railRef.current; if (!r) return;
    r.scrollBy({ left: dir * (r.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="section novedades" id="novedades">
      <div ref={headRef} className="novedades__head reveal">
        <div>
          <span className="eyebrow">{copy.novedadesEyebrow}</span>
          <h2 className="novedades__title" dangerouslySetInnerHTML={{ __html: copy.novedadesTitle }} />
        </div>
        <p className="hero__sub" style={{ margin: 0, maxWidth: 360 }}>{copy.novedadesLead}</p>
      </div>

      <div className="novedades__rail" ref={railRef}>
        {copy.novedadesPanels.map((p, i) => (
          <article key={i} className="novedades__panel">
            <div className={`novedades__panel-bg placeholder-vis placeholder-vis--${p.vis}`}>
              <span className="placeholder-vis__label">[ visual placeholder · {p.vis} ]</span>
            </div>
            <div className="novedades__panel-veil" />
            <div className="novedades__panel-content">
              <span className="novedades__panel-tag">{p.tag}</span>
              <div>
                <h3 className="novedades__panel-title">{p.title}</h3>
                <p className="novedades__panel-sub">{p.sub}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="novedades__rail-controls">
        <button className="rail-btn" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="rail-btn" onClick={() => scrollBy(1)} disabled={!canNext} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
}
window.Novedades = Novedades;

/* =============== FAVORITOS =============== */
function Favoritos({ copy }) {
  const ref = window.useReveal();
  return (
    <section className="section favoritos">
      <div ref={ref} className="favoritos__inner reveal">
        <div className="favoritos__visual">
          <div className="placeholder-vis placeholder-vis--steam">
            <span className="placeholder-vis__label">[ chef · wok · 240°C ]</span>
          </div>
          <div className="favoritos__visual-overlay">{copy.favoritosCaption}</div>
        </div>
        <div>
          <span className="eyebrow">{copy.favoritosEyebrow}</span>
          <h2 className="system__heading" style={{ marginBottom: 40 }}>{copy.favoritosHeading}</h2>
          <ol className="favoritos__list">
            {copy.favoritosItems.map((f, i) => (
              <li key={i} className="favoritos__item">
                <span className="favoritos__item-num">0{i+1}</span>
                <div>
                  <div className="favoritos__item-title">{f.title}</div>
                  <span className="favoritos__item-meta">{f.meta}</span>
                </div>
                <span className="favoritos__item-arrow">→</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
window.Favoritos = Favoritos;

/* =============== SUCURSALES =============== */
function Sucursales({ copy }) {
  const headRef = window.useReveal();
  const carouselRef = useRef(null);
  const [active, setActive] = useState(0);
  const locations = copy.sucursales;
  const loopedLocations = [...locations, ...locations, ...locations]; // Infinite loop

  // Initialize carousel to middle set
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !carousel.children[0]) return;

    const itemWidth = carousel.children[0].offsetWidth;
    const gap = 20;
    const startPos = (itemWidth + gap) * locations.length;
    carousel.scrollLeft = startPos;
    setActive(locations.length);
  }, []);

  // Detect and center item on scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const children = carousel.children;
      if (!children.length) return;

      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(carouselCenter - childCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActive(closestIndex);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-center active item
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !carousel.children[active]) return;

    const activeChild = carousel.children[active];
    const scrollLeft = activeChild.offsetLeft - (carousel.clientWidth / 2 - activeChild.offsetWidth / 2);
    carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [active]);

  const scrollCarousel = (dir) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const itemWidth = carousel.children[0]?.offsetWidth || 400;
    carousel.scrollBy({ left: dir * itemWidth, behavior: 'smooth' });
  };

  return (
    <section className="section sucursales" id="sucursales">
      <div ref={headRef} className="sucursales__head reveal">
        <div>
          <span className="eyebrow">{copy.sucursalesEyebrow}</span>
          <h2 className="sucursales__title">{copy.sucursalesHeading}</h2>
        </div>
        <p className="hero__sub" style={{ margin: 0, maxWidth: 320 }}>{copy.sucursalesLead}</p>
      </div>

      {/* Full-width carousel */}
      <div className="sucursales__carousel-wrap">
        <div className="sucursales__carousel" ref={carouselRef}>
          {loopedLocations.map((l, i) => (
            <div
              key={i}
              className={`sucursales__carousel-item ${active === i ? "is-active" : ""}`}
              data-location={l.name}
            >
              <div className={`sucursales__carousel-image ${l.image ? "has-image" : ""}`}>
                {l.image && <img src={`assets/${l.image}`} alt={l.name} data-location={l.name} />}
                {!l.image && <div className="sucursales__carousel-placeholder">
                  <span>{l.name}</span>
                </div>}
              </div>
              <div className="sucursales__carousel-label">
                <div className="sucursales__carousel-name">{l.name}</div>
                <div className="sucursales__carousel-city">{l.city}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="sucursales__carousel-btn sucursales__carousel-btn--prev" onClick={() => scrollCarousel(-1)} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="sucursales__carousel-btn sucursales__carousel-btn--next" onClick={() => scrollCarousel(1)} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

    </section>
  );
}
window.Sucursales = Sucursales;

/* =============== CONTACT =============== */
function Contact({ copy }) {
  const ref = window.useReveal();
  return (
    <section className="contact" id="contacto" ref={ref}>
      <h2 className="contact__title reveal">
        ¿<span className="accent">Hablamos</span>?
      </h2>
      <button className="contact__cta reveal reveal--delay-2">
        {copy.contactCta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </section>
  );
}
window.Contact = Contact;

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__brand">ROCK N WOK<span className="nav__brand-dot" /></span>
      <span>© 2026 · Cocina urbana con actitud · CDMX</span>
    </footer>
  );
}
window.Footer = Footer;
