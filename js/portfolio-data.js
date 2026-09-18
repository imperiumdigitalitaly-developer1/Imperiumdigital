/**
 * ============================================================
 * DATI PORTFOLIO — aggiungi qui i tuoi progetti
 * ============================================================
 * Un solo file per tutte le lingue del sito: aggiungi o modifichi
 * un progetto qui e compare automaticamente, tradotto, su tutte
 * le versioni linguistiche (index.html, en/, de/, fr/, es/).
 *
 * Per aggiungere un nuovo progetto, copia un blocco { ... } e
 * modifica i valori. "name", "categoryLabel" e "description"
 * vanno scritti in tutte le lingue (it/en/de/fr/es); per un nome
 * proprio (come "Le Dimore di Enea") ripeti lo stesso testo in
 * ogni lingua, i nomi propri non si traducono.
 *
 * Campi:
 * - name: { it, en, de, fr, es } — nome del progetto
 * - category: una tra "sito", "webapp", "app", "strumento"
 * - categoryLabel: { it, en, de, fr, es } — etichetta della categoria
 * - description: { it, en, de, fr, es } — breve descrizione (1-2 frasi)
 * - tech: array di tecnologie usate, es. ["HTML", "CSS", "JS"] (non si traduce)
 * - link: URL del progetto live, oppure "" se non disponibile
 * - caseStudy: URL a un case study esterno, oppure "" se assente
 * - image: percorso immagine (relativo alla cartella della pagina), oppure "" per usare il placeholder grafico
 * - placeholder: true se il progetto non è ancora pronto (mostra
 *   "Progetto in arrivo" invece dei dettagli)
 * ============================================================
 */

const PORTFOLIO_PROJECTS = [
  {
    name: {
      it: "Le Dimore di Enea",
      en: "Le Dimore di Enea",
      de: "Le Dimore di Enea",
      fr: "Le Dimore di Enea",
      es: "Le Dimore di Enea",
    },
    category: "sito",
    categoryLabel: {
      it: "Sito web",
      en: "Website",
      de: "Website",
      fr: "Site web",
      es: "Sitio web",
    },
    description: {
      it: "Sito web realizzato per una struttura ricettiva. Progettazione dell'interfaccia, struttura delle pagine, responsive design e sviluppo.",
      en: "Website built for a hospitality business. Interface design, page structure, responsive design and development.",
      de: "Website für einen Beherbergungsbetrieb. Interface-Design, Seitenstruktur, responsives Design und Entwicklung.",
      fr: "Site web réalisé pour un établissement d'hébergement. Conception de l'interface, structure des pages, design responsive et développement.",
      es: "Sitio web realizado para un alojamiento turístico. Diseño de interfaz, estructura de páginas, diseño responsive y desarrollo.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://ledimoredienea.netlify.app",
    caseStudy: "",
    image: "assets/le-dimore-di-enea.jpg",
    placeholder: false,
  },
  {
    name: {
      it: "DigitalCheck",
      en: "DigitalCheck",
      de: "DigitalCheck",
      fr: "DigitalCheck",
      es: "DigitalCheck",
    },
    category: "webapp",
    categoryLabel: {
      it: "Web app",
      en: "Web app",
      de: "Web-App",
      fr: "Application web",
      es: "Aplicación web",
    },
    description: {
      it: "Web app che analizza SEO, performance, mobile, contenuti e capacità di conversione di un sito. Genera un Digital Score con un report chiaro e azioni concrete per migliorare la presenza digitale.",
      en: "Web app that analyzes a website's SEO, performance, mobile-friendliness, content and conversion potential. Generates a Digital Score with a clear report and concrete actions to improve online presence.",
      de: "Web-App, die SEO, Performance, Mobilfreundlichkeit, Inhalte und Konversionsfähigkeit einer Website analysiert. Erstellt einen Digital Score mit einem klaren Bericht und konkreten Maßnahmen zur Verbesserung der digitalen Präsenz.",
      fr: "Application web qui analyse le référencement (SEO), les performances, l'adaptation mobile, le contenu et la capacité de conversion d'un site. Génère un Digital Score avec un rapport clair et des actions concrètes pour améliorer la présence numérique.",
      es: "Aplicación web que analiza el SEO, el rendimiento, la adaptación móvil, los contenidos y la capacidad de conversión de un sitio web. Genera un Digital Score con un informe claro y acciones concretas para mejorar la presencia digital.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://digitalcheck.imperiumdigitalitalia.it/",
    caseStudy: "",
    image: "assets/digitalcheck.jpg",
    placeholder: false,
  },
  {
    name: {
      it: "Progetto in arrivo",
      en: "Coming soon",
      de: "Projekt in Vorbereitung",
      fr: "Projet à venir",
      es: "Próximamente",
    },
    category: "app",
    categoryLabel: {
      it: "App",
      en: "App",
      de: "App",
      fr: "Application",
      es: "App",
    },
    description: { it: "", en: "", de: "", fr: "", es: "" },
    tech: [],
    link: "",
    caseStudy: "",
    image: "",
    placeholder: true,
  },
  {
    name: {
      it: "Progetto in arrivo",
      en: "Coming soon",
      de: "Projekt in Vorbereitung",
      fr: "Projet à venir",
      es: "Próximamente",
    },
    category: "strumento",
    categoryLabel: {
      it: "Strumento digitale",
      en: "Digital tool",
      de: "Digitales Tool",
      fr: "Outil numérique",
      es: "Herramienta digital",
    },
    description: { it: "", en: "", de: "", fr: "", es: "" },
    tech: [],
    link: "",
    caseStudy: "",
    image: "",
    placeholder: true,
  },
];
