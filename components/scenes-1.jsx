/* global React */
const { useEffect, useRef, useState } = React;

/* =============== STATEMENT =============== */
function Statement({ copy }) {
  const ref = window.useReveal();
  return (
    <section className="section section--full statement">
      <div className="statement__inner">
        <h2 ref={ref} className="statement__big reveal">
          <span>{copy.statementLine1}</span><br/>
          <span className="accent">{copy.statementLine2}</span>
        </h2>
        <div className="statement__caption">
          <span>{copy.statementCaption}</span>
        </div>
      </div>
    </section>
  );
}
window.Statement = Statement;

/* =============== SYSTEM =============== */
function SystemSection({ copy }) {
  const headRef = window.useReveal();
  const diagRef = window.useReveal();
  const [active, setActive] = useState(0);
  const items = copy.systemItems;

  // Layout 4 nodes equidistant on a circle
  const radius = 38; // % of half-side
  const positions = items.map((_, i) => {
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI / items.length));
    return {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`,
    };
  });

  return (
    <section className="section system" id="sistema">
      <div className="system__inner">
        <div ref={headRef} className="reveal">
          <span className="eyebrow">{copy.systemEyebrow}</span>
          <h2 className="system__heading">{copy.systemHeading}</h2>
          <p className="system__lead">{copy.systemLead}</p>
          <ul className="system__list">
            {items.map((it, i) => (
              <li
                key={i}
                className={`system__item ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <span className="system__item-num">0{i+1}</span>
                <div>
                  <div className="system__item-title">{it.title}</div>
                  <span className="system__item-desc">{it.desc}</span>
                </div>
                <span className="system__item-arrow">→</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={diagRef} className="diagram reveal reveal--delay-2">
          <svg className="diagram__rings" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,214,10,0.08)" strokeWidth="0.15" strokeDasharray="0.5 0.5" />
            {/* Lines from core to each node */}
            {positions.map((p, i) => {
              const x = 50 + radius * Math.cos((-Math.PI / 2) + (i * (2 * Math.PI / items.length)));
              const y = 50 + radius * Math.sin((-Math.PI / 2) + (i * (2 * Math.PI / items.length)));
              const isActive = active === i;
              return (
                <line key={i}
                  x1="50" y1="50"
                  x2={x} y2={y}
                  stroke={isActive ? "#FFD60A" : "rgba(255,255,255,0.12)"}
                  strokeWidth={isActive ? "0.3" : "0.15"}
                />
              );
            })}
          </svg>
          <div className="diagram__core">
            <div className="diagram__core-inner">
              <span>R N W<br/>OS</span>
            </div>
          </div>
          {items.map((it, i) => (
            <button key={i}
              className={`diagram__node ${active === i ? "is-active" : ""}`}
              style={positions[i]}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              type="button"
            >
              <SystemIcon name={it.icon} />
              <span>{it.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemIcon({ name }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "wok") return <svg {...props}><path d="M3 11h18l-2 5a4 4 0 0 1-4 3H9a4 4 0 0 1-4-3l-2-5z"/><path d="M21 11l2-2"/><circle cx="9" cy="14" r="0.6" fill="currentColor"/><circle cx="13" cy="15" r="0.6" fill="currentColor"/></svg>;
  if (name === "tech") return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9 9h6v6H9z"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>;
  if (name === "exp") return <svg {...props}><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/><path d="M12 3v18M3 12h18"/></svg>;
  if (name === "data") return <svg {...props}><path d="M3 18l5-6 4 3 8-9"/><path d="M3 21h18"/></svg>;
  return null;
}

window.SystemSection = SystemSection;
