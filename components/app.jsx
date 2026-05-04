/* global React, ReactDOM */
const { useState } = React;

const COPY = {
  es: {
    heroEyebrow: "WOK YOUR SPIRIT",
    heroSub: "No es solo comida. Es un sistema que aprende de ti.",
    heroCtaPrimary: "Pide en Línea",
    heroCtaSecondary: null,

    statementLine1: "PRECISIÓN.",
    statementLine2: "TECNOLOGÍA. RITUAL.",
    statementCaption: "Cada plato. Mismo proceso. Diferente cada vez porque nos adaptamos a ti.",

    systemEyebrow: "EL SISTEMA",
    systemHeading: "Cuatro capas. Una razón.",
    systemLead: "Nada sucede por accidente aquí.",
    systemItems: [
      { title: "Cocina",      desc: "240°C. Tres tiempos. Sin compromisos.", icon: "wok" },
      { title: "Tecnología",  desc: "Tu orden es tan importante como tu tiempo.",   icon: "tech" },
      { title: "Espacio",     desc: "Cada detalle cuenta. Incluido dónde te sientas.",          icon: "exp" },
      { title: "Datos",       desc: "Recordamos. Mejoramos. Repetimos.",       icon: "data" },
    ],

    novedadesEyebrow: "LABORATORIO",
    novedadesTitle: "Lo que estamos<br/>probando.",
    novedadesLead: "Nuevas texturas. Nuevos sabores. Mismo rigor.",
    novedadesPanels: [
      { tag: "EXPERIMENTO 01", title: "Wok Lab", sub: "Una cocina abierta. Tu fuego. Tu control.", vis: "wok" },
      { tag: "EXPERIMENTO 02", title: "Entrega en 6", sub: "Desde tu orden hasta tu mesa. Cronometrado.", vis: "steam" },
      { tag: "EXPERIMENTO 03", title: "RNW · OS",  sub: "La plataforma que conecta todo. Para ti.", vis: "lab" },
      { tag: "EXPERIMENTO 04", title: "Espíritu Maneki",    sub: "Lo que significa servir con atención.",   vis: "wok" },
    ],

    favoritosEyebrow: "LO QUE ELIGEN",
    favoritosHeading: "Estos dicen mucho.",
    favoritosCaption: "NO PORQUE SEAN POPULARES. PORQUE FUNCIONAN.",
    favoritosItems: [
      { title: "Yakimeshi Rock",      meta: "Cuando quieres control. 4 proteínas. 3 fuegos." },
      { title: "Lo Mein de la Casa",  meta: "Tallarín del día. Vegetales de mercado." },
      { title: "Pollo Sichuán",       meta: "El que preguntan por nombre." },
      { title: "Tofu Trueno",         meta: "Crujiente. Fermentado. Intencional." },
      { title: "Salmón Wok",          meta: "Sellado. Rápido. Nunca crudo." },
    ],

    sucursalesEyebrow: "DÓNDE ENCONTRARNOS",
    sucursalesHeading: "El mismo sistema. En 9 lugares.",
    sucursalesLead: "La experiencia no cambia de sucursal. Solo crece.",
    sucursales: [
      { name: "UPAEP",      city: "Puebla",     x: 300, y: 200, soon: false, region: "puebla", image: "3-2.webp" },
      { name: "Angelópolis",city: "Puebla",     x: 350, y: 180, soon: true,  region: "puebla", image: "ange.webp" },
      { name: "Explanada",  city: "Puebla",     x: 320, y: 240, soon: false, region: "puebla", image: "exp.webp" },
      { name: "Galerías Serdán", city: "Puebla", x: 280, y: 260, soon: false, region: "puebla", image: "galerias.webp" },
      { name: "Outlet Puebla", city: "Puebla",  x: 370, y: 220, soon: false, region: "puebla", image: "outlet.webp" },
      { name: "Parque Puebla", city: "Puebla",  x: 340, y: 280, soon: false, region: "puebla", image: "parque-puebla.webp" },
      { name: "Sonata",     city: "Puebla",     x: 310, y: 150, soon: false, region: "puebla", image: "sonata.webp" },
      { name: "Vía San Ángel", city: "Puebla",  x: 360, y: 260, soon: false, region: "puebla", image: "via-general.webp" },
      { name: "Zócalo",     city: "Puebla",     x: 330, y: 210, soon: false, region: "puebla", image: "zocalo.webp" },
    ],

    contactCta: "¿Listo para probarlo?",
  },
  en: {
    heroEyebrow: "WOK YOUR SPIRIT",
    heroSub: "It's not just food. It's a system that learns from you.",
    heroCtaPrimary: "Order Online",
    heroCtaSecondary: null,

    statementLine1: "PRECISION.",
    statementLine2: "TECHNOLOGY. RITUAL.",
    statementCaption: "Every plate. Same process. Different every time because we adapt to you.",

    systemEyebrow: "THE SYSTEM",
    systemHeading: "Four layers. One reason.",
    systemLead: "Nothing happens by accident here.",
    systemItems: [
      { title: "Kitchen",     desc: "240°C. Three moments. No compromises.", icon: "wok" },
      { title: "Technology",  desc: "Your order is as important as your time.", icon: "tech" },
      { title: "Space",       desc: "Every detail matters. Including where you sit.",        icon: "exp" },
      { title: "Data",        desc: "We remember. We improve. We repeat.",      icon: "data" },
    ],

    novedadesEyebrow: "LABORATORY",
    novedadesTitle: "What we're<br/>testing.",
    novedadesLead: "New textures. New flavors. Same rigor.",
    novedadesPanels: [
      { tag: "EXPERIMENT 01", title: "Wok Lab",  sub: "An open kitchen. Your fire. Your control.",                        vis: "wok"   },
      { tag: "EXPERIMENT 02", title: "Six Minute",sub: "From your order to your table. Timed.",                  vis: "steam" },
      { tag: "EXPERIMENT 03", title: "RNW · OS", sub: "The platform that connects everything. For you.",       vis: "lab"   },
      { tag: "EXPERIMENT 04", title: "Maneki Spirit",   sub: "What it means to serve with intention.",        vis: "wok"   },
    ],

    favoritosEyebrow: "WHAT PEOPLE CHOOSE",
    favoritosHeading: "These say a lot.",
    favoritosCaption: "NOT BECAUSE THEY'RE POPULAR. BECAUSE THEY WORK.",
    favoritosItems: [
      { title: "Rock Yakimeshi",  meta: "When you want control. 4 proteins · 3 heats." },
      { title: "House Lo Mein",   meta: "Today's noodle. Market vegetables." },
      { title: "Sichuan Chicken", meta: "The one they ask for by name." },
      { title: "Thunder Tofu",    meta: "Crispy. Fermented. Intentional." },
      { title: "Wok Salmon",      meta: "Seared. Fast. Never raw." },
    ],

    sucursalesEyebrow: "WHERE TO FIND US",
    sucursalesHeading: "Same system. Nine places.",
    sucursalesLead: "The experience doesn't change between locations. It just grows.",
    sucursales: [
      { name: "UPAEP",      city: "Puebla",     x: 300, y: 200, soon: false, region: "puebla", image: "3-2.webp" },
      { name: "Angelópolis",city: "Puebla",     x: 350, y: 180, soon: true,  region: "puebla", image: "ange.webp" },
      { name: "Explanada",  city: "Puebla",     x: 320, y: 240, soon: false, region: "puebla", image: "exp.webp" },
      { name: "Galerías Serdán", city: "Puebla", x: 280, y: 260, soon: false, region: "puebla", image: "galerias.webp" },
      { name: "Outlet Puebla", city: "Puebla",  x: 370, y: 220, soon: false, region: "puebla", image: "outlet.webp" },
      { name: "Parque Puebla", city: "Puebla",  x: 340, y: 280, soon: false, region: "puebla", image: "parque-puebla.webp" },
      { name: "Sonata",     city: "Puebla",     x: 310, y: 150, soon: false, region: "puebla", image: "sonata.webp" },
      { name: "Vía San Ángel", city: "Puebla",  x: 360, y: 260, soon: false, region: "puebla", image: "via-general.webp" },
      { name: "Zócalo",     city: "Puebla",     x: 330, y: 210, soon: false, region: "puebla", image: "zocalo.webp" },
    ],

    contactCta: "Ready to try it?",
  },
};

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "language": "es",
    "techIntensity": 1,
    "accent": "yellow"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const copy = COPY[tweaks.language] || COPY.es;

  // Apply accent variant by changing CSS var
  React.useEffect(() => {
    const root = document.documentElement;
    if (tweaks.accent === "gold") {
      root.style.setProperty("--rnw-yellow", "#E8B84A");
      root.style.setProperty("--rnw-yellow-warm", "#D9A638");
    } else if (tweaks.accent === "orange") {
      root.style.setProperty("--rnw-yellow", "#FF8A1A");
      root.style.setProperty("--rnw-yellow-warm", "#E0700A");
    } else {
      root.style.setProperty("--rnw-yellow", "#EBA228");
      root.style.setProperty("--rnw-yellow-warm", "#D99020");
    }
  }, [tweaks.accent]);

  const onReserve = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <a id="top" />
      <window.Nav onReserve={onReserve} />
      <window.Hero techIntensity={tweaks.techIntensity} copy={copy} />
      <window.Statement copy={copy} />
      <window.SystemSection copy={copy} />
      <window.Novedades copy={copy} />
      <window.Favoritos copy={copy} />
      <window.Sucursales copy={copy} />
      <window.Contact copy={copy} />
      <window.Footer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Language">
          <window.TweakRadio
            value={tweaks.language}
            onChange={(v) => setTweak("language", v)}
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Tech overlay">
          <window.TweakSlider
            label="Intensity"
            value={tweaks.techIntensity}
            onChange={(v) => setTweak("techIntensity", v)}
            min={0} max={1} step={0.05}
          />
        </window.TweakSection>
        <window.TweakSection title="Accent color">
          <window.TweakRadio
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "yellow", label: "Yellow" },
              { value: "gold",   label: "Gold" },
              { value: "orange", label: "Orange" },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
