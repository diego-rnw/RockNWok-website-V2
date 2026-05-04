/* global React */
// Tech overlay — circuit lines, data pulses, floating UI chips for the hero
const { useEffect, useRef, useState } = React;

function TechOverlay({ intensity = 1 }) {
  return (
    <div className="tech-overlay" style={{ "--tech-intensity": intensity }}>
      {/* Right-side circuit traces emanating from neon cat */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="techBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF8C42" stopOpacity="0" />
            <stop offset="40%" stopColor="#FF8C42" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.2" />
          </linearGradient>
          <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Right side circuit network */}
        <g stroke="url(#techBlue)" strokeWidth="1.2" fill="none" filter="url(#circuitGlow)" opacity="0.85">
          <path className="circuit-line" d="M 1280 320 L 1380 320 L 1380 280 L 1500 280" />
          <path className="circuit-line" style={{ animationDelay: '0.2s' }} d="M 1280 380 L 1340 380 L 1340 420 L 1480 420 L 1480 460 L 1560 460" />
          <path className="circuit-line" style={{ animationDelay: '0.4s' }} d="M 1300 480 L 1360 480 L 1360 540 L 1480 540 L 1480 600 L 1540 600 L 1540 700" />
          <path className="circuit-line" style={{ animationDelay: '0.6s' }} d="M 1320 600 L 1400 600 L 1400 720 L 1500 720" />
          <path className="circuit-line" style={{ animationDelay: '0.3s' }} d="M 1380 240 L 1380 180 L 1460 180" />
          <path className="circuit-line" style={{ animationDelay: '0.5s' }} d="M 1340 350 L 1340 290 L 1300 290" />
        </g>

        {/* Circuit nodes (small squares + dots) */}
        <g fill="#FF8C42" filter="url(#circuitGlow)">
          <rect x="1377" y="277" width="6" height="6" />
          <rect x="1477" y="417" width="6" height="6" />
          <rect x="1477" y="537" width="6" height="6" />
          <rect x="1397" y="717" width="6" height="6" />
          <circle cx="1500" cy="280" r="2.5" />
          <circle cx="1560" cy="460" r="2.5" />
          <circle cx="1540" cy="700" r="2.5" />
        </g>

        {/* Left side — minimal ground line */}
        <g stroke="url(#techBlue)" strokeWidth="1" fill="none" opacity="0.45">
          <path className="circuit-line" style={{ animationDelay: '0.8s' }} d="M 40 720 L 200 720 L 200 760 L 360 760" />
          <path className="circuit-line" style={{ animationDelay: '1.0s' }} d="M 80 200 L 80 140 L 220 140" />
        </g>

        {/* Traveling pulses on circuit paths */}
        <circle r="3" className="circuit-pulse" opacity="0.9">
          <animateMotion dur="6s" repeatCount="indefinite" begin="2s"
            path="M 1280 380 L 1340 380 L 1340 420 L 1480 420 L 1480 460 L 1560 460" />
        </circle>
        <circle r="2.5" className="circuit-pulse" opacity="0.85">
          <animateMotion dur="7.5s" repeatCount="indefinite" begin="3s"
            path="M 1300 480 L 1360 480 L 1360 540 L 1480 540 L 1480 600 L 1540 600 L 1540 700" />
        </circle>
        <circle r="2.5" className="circuit-pulse" opacity="0.85">
          <animateMotion dur="5s" repeatCount="indefinite" begin="3.5s"
            path="M 1280 320 L 1380 320 L 1380 280 L 1500 280" />
        </circle>
      </svg>

      {/* Floating UI chips — minimal, like callouts in a product diagram */}
      <div className="tech-overlay__chip" style={{ top: '14%', right: '8%', animation: 'fadeInUp 0.8s 1.2s var(--ease-out) backwards' }}>
        <span className="tech-overlay__chip-dot"></span>
        <span>Sistema 01 · Activo</span>
      </div>
      <div className="tech-overlay__chip" style={{ top: '62%', right: '4%', animation: 'fadeInUp 0.8s 1.6s var(--ease-out) backwards' }}>
        <span className="tech-overlay__chip-dot" style={{ background: '#EBA228', boxShadow: '0 0 8px #EBA228' }}></span>
        <span>Wok · 240°C</span>
      </div>
      <div className="tech-overlay__chip" style={{ top: '78%', left: '46%', animation: 'fadeInUp 0.8s 2.0s var(--ease-out) backwards' }}>
        <span className="tech-overlay__chip-dot"></span>
        <span>Ambient · Cinematic</span>
      </div>
    </div>
  );
}

window.TechOverlay = TechOverlay;
