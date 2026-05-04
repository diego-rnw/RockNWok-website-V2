/* global React, ReactDOM */
const { useState } = React;

const COPY = {
  es: {
    heroEyebrow: "NO TODOS COMEN IGUAL",
    heroSub: "Tu orden merece más que rapidez. Merece precisión. Ambiente. Atención. Un sistema que te respeta.",
    heroCtaPrimary: "Pide en Línea",
    heroCtaSecondary: null,

    statementLine1: "COCINAMOS CON PRECISIÓN.",
    statementLine2: "SERVIMOS CON INTENCIÓN.",
    statementLine3: "APRENDEMOS DE TI.",
    statementCaption: "Cada visita nos enseña qué importa. La próxima, lo hacemos mejor.",

    systemEyebrow: "CÓMO FUNCIONA",
    systemHeading: "Un sistema. Cuatro capas.",
    systemLead: "Nada sucede por accidente. Cada detalle está diseñado para ti.",
    systemItems: [
      { title: "Tu Orden",    desc: "Tu pedido llega claro. Nosotros entendemos lo que quieres.", icon: "tech" },
      { title: "Cocina",      desc: "240°C. Tres tiempos. Sin excepciones. Precisión que no negocia.", icon: "wok" },
      { title: "Espacio",     desc: "El lugar donde comes importa tanto como el plato. Por eso cada detalle está diseñado.", icon: "exp" },
      { title: "Datos",       desc: "Tu experiencia nos enseña. Visitamos, mejoramos, repetimos.",       icon: "data" },
    ],

    novedadesEyebrow: "LO QUE ESTAMOS PROBANDO",
    novedadesTitle: "Nuevas formas de<br/>hacerlo mejor.",
    novedadesLead: "No nos quedamos con lo que funciona. Buscamos lo que sorprende.",
    novedadesPanels: [
      { tag: "EXPERIMENTO 01", title: "Wok Lab", sub: "Una cocina abierta. Ves cómo se hace. Entiendes por qué.", vis: "wok" },
      { tag: "EXPERIMENTO 02", title: "Entrega en 6", sub: "Desde que ordenas hasta que llegas: 6 minutos. Sin prisa. Sin espera.", vis: "steam" },
      { tag: "EXPERIMENTO 03", title: "RNW · OS",  sub: "Una plataforma que conecta todo. Orden, cocina, espacio. Sincronizados para ti.", vis: "lab" },
      { tag: "EXPERIMENTO 04", title: "Espíritu Maneki",    sub: "La atención es una acción, no un sentimiento. Es todo lo que hacemos.",   vis: "wok" },
    ],

    favoritosEyebrow: "LO QUE LA GENTE ORDENA",
    favoritosHeading: "No porque sean populares.<br/>Porque resuelven algo.",
    favoritosCaption: "CADA PLATO CUENTA UNA HISTORIA DE CONTROL, SABOR Y PRECISIÓN.",
    favoritosItems: [
      { title: "Yakimeshi Rock",      meta: "Para cuando quieres sentir que controlas cada capa de sabor. 4 proteínas. 3 fuegos. Tuyo." },
      { title: "Lo Mein de la Casa",  meta: "Tallarín vivo. Del mercado hoy, en tu plato mañana. Lo fresco que no se improvisa." },
      { title: "Pollo Sichuán",       meta: "El que la gente pregunta por nombre. Una lección en balance: picante, crujiente, sutil." },
      { title: "Tofu Trueno",         meta: "Para los que creen que el tofu puede ser memorable. Crujiente. Fermentado. Impactante." },
      { title: "Salmón Wok",          meta: "Sellado en el momento. Soya negra. Ajonjolí. Simplicidad con propósito." },
    ],

    sucursalesEyebrow: "NUEVE ESPACIOS. UN SISTEMA.",
    sucursalesHeading: "La experiencia es la misma.<br/>El lugar es diferente.",
    sucursalesLead: "Abierto en Puebla. Creciendo con el rigor que importa.",
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

    contactCta: "¿Listo para comer diferente?",
  },
  en: {
    heroEyebrow: "NOT EVERYONE EATS THE SAME",
    heroSub: "Your order deserves more than speed. It deserves precision. Atmosphere. Attention. A system that respects you.",
    heroCtaPrimary: "Order Online",
    heroCtaSecondary: null,

    statementLine1: "WE COOK WITH PRECISION.",
    statementLine2: "WE SERVE WITH INTENTION.",
    statementLine3: "WE LEARN FROM YOU.",
    statementCaption: "Every visit teaches us what matters. Next time, we do it better.",

    systemEyebrow: "HOW IT WORKS",
    systemHeading: "One system. Four layers.",
    systemLead: "Nothing happens by accident. Every detail is designed for you.",
    systemItems: [
      { title: "Your Order",  desc: "Your order arrives clear. We understand what you want.", icon: "tech" },
      { title: "Kitchen",     desc: "240°C. Three moments. No exceptions. Precision that doesn't compromise.", icon: "wok" },
      { title: "Space",       desc: "Where you eat matters as much as the plate. That's why every detail is designed.", icon: "exp" },
      { title: "Data",        desc: "Your experience teaches us. We visit, improve, repeat.",      icon: "data" },
    ],

    novedadesEyebrow: "WHAT WE'RE TESTING",
    novedadesTitle: "New ways to<br/>do it better.",
    novedadesLead: "We don't settle for what works. We're chasing what surprises.",
    novedadesPanels: [
      { tag: "EXPERIMENT 01", title: "Wok Lab",  sub: "An open kitchen. You see how it's made. You understand why.",                        vis: "wok"   },
      { tag: "EXPERIMENT 02", title: "Six Minute",sub: "From your order to your table: 6 minutes. No rush. No wait.",                  vis: "steam" },
      { tag: "EXPERIMENT 03", title: "RNW · OS", sub: "A platform that connects everything. Order, kitchen, space. Synchronized for you.",       vis: "lab"   },
      { tag: "EXPERIMENT 04", title: "Maneki Spirit",   sub: "Attention is an action, not a feeling. It's everything we do.",        vis: "wok"   },
    ],

    favoritosEyebrow: "WHAT PEOPLE ORDER",
    favoritosHeading: "Not because they're popular.<br/>Because they solve something.",
    favoritosCaption: "EACH PLATE TELLS A STORY OF CONTROL, FLAVOR AND PRECISION.",
    favoritosItems: [
      { title: "Rock Yakimeshi",  meta: "For when you want to feel you control every layer of taste. 4 proteins. 3 heats. Yours." },
      { title: "House Lo Mein",   meta: "Living noodle. Market today, your plate tomorrow. Freshness that doesn't improvise." },
      { title: "Sichuan Chicken", meta: "The one people ask for by name. A lesson in balance: spicy, crispy, subtle." },
      { title: "Thunder Tofu",    meta: "For those who believe tofu can be memorable. Crispy. Fermented. Impactful." },
      { title: "Wok Salmon",      meta: "Seared in the moment. Black soy. Sesame. Simplicity with purpose." },
    ],

    sucursalesEyebrow: "NINE SPACES. ONE SYSTEM.",
    sucursalesHeading: "The experience is the same.<br/>The place is different.",
    sucursalesLead: "Open in Puebla. Growing with the rigor that matters.",
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

    contactCta: "Ready to eat differently?",
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
