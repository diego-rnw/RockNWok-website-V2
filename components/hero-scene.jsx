/* global React */
const { useEffect, useRef, useState } = React;

// HeroScene — recreates the dining room with overhead spotlights that
// open their cone angle as the user scrolls down. Pure SVG/CSS so we
// can animate the geometry.
function HeroScene({ scrollProgress = 0 }) {
  // 0 = closed (narrow cones), 1 = wide-open
  const t = Math.max(0, Math.min(1, scrollProgress));

  // Cone half-width in viewBox units. Closed = 22 (tight beam), open = 130 (wide wash).
  const halfW = 22 + t * 108;
  // Cone length grows too
  const coneLen = 380 + t * 80;
  // Apex glow grows
  const glow = 0.45 + t * 0.55;
  // Wall wash intensity — light bleeds onto wall as cones open
  const wallWash = t;

  // 6 overhead lights, evenly spread across the wall
  const lights = [
    { x: 180 },
    { x: 360 },
    { x: 540 },
    { x: 720 },
    { x: 900 },
    { x: 1080 },
  ];
  const apexY = 130;
  const baseY = apexY + coneLen;

  return (
    <div className="hero-scene">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="hero-scene__svg" aria-hidden="true">
        <defs>
          {/* Granite wall pattern */}
          <radialGradient id="walGrad" cx="50%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#1c1a18" />
            <stop offset="55%" stopColor="#0f0d0c" />
            <stop offset="100%" stopColor="#050403" />
          </radialGradient>
          <linearGradient id="ceilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040404" />
            <stop offset="100%" stopColor="#0a0908" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1614" />
            <stop offset="100%" stopColor="#050403" />
          </linearGradient>
          <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFD173" stopOpacity="0.85" />
            <stop offset="35%"  stopColor="#E8B84A" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#E8B84A" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="floorPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFD173" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#E8B84A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#E8B84A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="apexGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFE7B0" stopOpacity="1" />
            <stop offset="40%"  stopColor="#FFD173" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFD173" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldText" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFE7A1" />
            <stop offset="45%"  stopColor="#E8B84A" />
            <stop offset="100%" stopColor="#8C6A1F" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b2"/>
            <feMerge>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="granite" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#0f0d0c" />
            <circle cx="12" cy="20" r="0.6" fill="rgba(255,255,255,0.04)" />
            <circle cx="44" cy="8"  r="0.4" fill="rgba(255,255,255,0.05)" />
            <circle cx="60" cy="38" r="0.5" fill="rgba(255,255,255,0.03)" />
            <circle cx="22" cy="58" r="0.7" fill="rgba(255,255,255,0.04)" />
            <circle cx="70" cy="68" r="0.4" fill="rgba(255,255,255,0.05)" />
            <circle cx="6"  cy="74" r="0.5" fill="rgba(255,255,255,0.03)" />
          </pattern>
        </defs>

        {/* Ceiling band */}
        <rect x="0" y="0" width="1600" height="120" fill="url(#ceilGrad)" />
        {/* Wall */}
        <rect x="0" y="120" width="1600" height="560" fill="url(#walGrad)" />
        <rect x="0" y="120" width="1600" height="560" fill="url(#granite)" opacity="0.6" />
        {/* Floor — receding perspective */}
        <polygon points="0,680 1600,680 1600,900 0,900" fill="url(#floorGrad)" />
        {/* Subtle floor lines (perspective) */}
        <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
          <line x1="200" y1="680" x2="-100" y2="900" />
          <line x1="500" y1="680" x2="350" y2="900" />
          <line x1="800" y1="680" x2="800" y2="900" />
          <line x1="1100" y1="680" x2="1250" y2="900" />
          <line x1="1400" y1="680" x2="1700" y2="900" />
        </g>

        {/* Light fixtures (track on ceiling) */}
        <rect x="80" y="115" width="1440" height="6" fill="#1a1614" />
        {lights.map((l, i) => (
          <g key={`fix-${i}`}>
            <rect x={l.x - 18} y="118" width="36" height="14" rx="2" fill="#0a0908" stroke="#2a2624" strokeWidth="1"/>
            <rect x={l.x - 12} y="128" width="24" height="3" fill="#FFE7B0" opacity={0.7 + t*0.3} />
          </g>
        ))}

        {/* Wall wash — soft warm gradient that intensifies as cones open */}
        <g style={{ mixBlendMode: 'screen' }} opacity={wallWash}>
          {lights.map((l, i) => (
            <ellipse
              key={`wash-${i}`}
              cx={l.x}
              cy={apexY + 200}
              rx={halfW * 1.2}
              ry={180}
              fill="url(#apexGlow)"
              opacity={0.4}
            />
          ))}
        </g>

        {/* Spotlight CONES — these animate with scroll */}
        <g style={{ mixBlendMode: 'screen' }}>
          {lights.map((l, i) => {
            // Apex pulled inward as cone opens (rotates around fixture)
            const ax = l.x;
            const ay = apexY;
            const blx = l.x - halfW;
            const brx = l.x + halfW;
            const by = baseY;
            return (
              <g key={`cone-${i}`}>
                <polygon
                  points={`${ax},${ay} ${blx},${by} ${brx},${by}`}
                  fill="url(#coneGrad)"
                  opacity={0.9}
                />
                {/* apex glow */}
                <circle cx={ax} cy={ay+4} r={28} fill="url(#apexGlow)" opacity={glow} />
                {/* floor pool — wider as cone opens */}
                <ellipse
                  cx={ax}
                  cy={by - 6}
                  rx={halfW * 1.05}
                  ry={halfW * 0.32}
                  fill="url(#floorPool)"
                  opacity={0.7 + t*0.2}
                />
              </g>
            );
          })}
        </g>

        {/* Gold "WOK YOUR SPIRIT" on the wall */}
        <g filter="url(#goldGlow)">
          <text
            x="780" y="430"
            textAnchor="middle"
            fontFamily='"Monument Extended", "Arial Black", sans-serif'
            fontWeight="800"
            fontSize="118"
            letterSpacing="-2"
            fill="url(#goldText)"
            style={{ textTransform: 'uppercase' }}
          >WOK YOUR SPIRIT</text>
        </g>
        {/* Faint reflection on wall under text */}
        <ellipse cx="780" cy="470" rx="380" ry="14" fill="#E8B84A" opacity="0.08" filter="url(#goldGlow)" />

        {/* Tables silhouette in foreground */}
        <g opacity="0.95">
          {[120, 360, 600, 840, 1080, 1320].map((tx, i) => (
            <g key={`tbl-${i}`}>
              {/* table top */}
              <rect x={tx} y={720} width={200} height={14} fill="#0c0a09" />
              {/* legs (pedestal) */}
              <polygon points={`${tx+86},734 ${tx+114},734 ${tx+122},800 ${tx+78},800`} fill="#1f1c19" />
              {/* chairs (small silhouettes) */}
              <rect x={tx-6}  y={760} width={26} height={36} fill="#080706" />
              <rect x={tx+30} y={765} width={22} height={32} fill="#080706" />
              <rect x={tx+148} y={765} width={22} height={32} fill="#080706" />
              <rect x={tx+180} y={760} width={26} height={36} fill="#080706" />
            </g>
          ))}
        </g>

        {/* Neon Lucky Cat (Maneki) — far right */}
        <g transform="translate(1380 360) scale(0.9)" filter="url(#neonGlow)" stroke="#FFD173" strokeWidth="2.2" fill="none" opacity={0.95}>
          {/* body */}
          <path d="M -60 80 C -60 130, 60 130, 60 80 L 60 0 C 60 -40, -60 -40, -60 0 Z" />
          {/* head circle */}
          <circle cx="0" cy="-40" r="48" />
          {/* ears */}
          <path d="M -38 -76 L -22 -100 L -8 -78 Z" />
          <path d="M  38 -76 L  22 -100 L  8 -78 Z" />
          {/* eyes */}
          <path d="M -18 -44 q 4 -8 8 0" />
          <path d="M  10 -44 q 4 -8 8 0" />
          {/* whiskers + smile */}
          <path d="M -4 -28 q 4 6 8 0" />
          {/* raised paw */}
          <path d="M 38 0 q 18 -10 22 -28 q 4 -16 -10 -22 q -16 -4 -22 14" />
          {/* belly bib */}
          <ellipse cx="0" cy="40" rx="28" ry="22" />
          {/* coin */}
          <circle cx="0" cy="40" r="10" />
        </g>
        {/* cat platform */}
        <rect x="1340" y="640" width="120" height="6" fill="#1a1614" />

        {/* Tiny ceiling stars (LED dots in original photo) */}
        <g fill="#FFE7B0" opacity="0.5">
          {Array.from({length: 26}).map((_, i) => {
            const x = (i * 137) % 1600;
            const y = 12 + ((i * 41) % 90);
            return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.1 : 0.7} />;
          })}
        </g>
      </svg>
    </div>
  );
}

window.HeroScene = HeroScene;
