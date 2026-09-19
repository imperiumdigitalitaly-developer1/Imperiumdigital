/**
 * ============================================================
 * MAIN.JS — interazioni del sito
 * ============================================================
 * Legge i dati da config.js e portfolio-data.js e gestisce:
 * - iniezione dei dati di contatto nelle pagine
 * - header sticky con ombra allo scroll
 * - menu mobile
 * - accordion FAQ
 * - generazione e filtro del portfolio
 * ============================================================
 */

/**
 * ============================================================
 * TESTI D'INTERFACCIA PER LINGUA
 * ============================================================
 * Ogni pagina (index.html, en/index.html, de/index.html, ...)
 * definisce `const PAGE_LANG = "it";` (o "en"/"de"/"fr"/"es")
 * PRIMA di caricare questo file. Serve solo per le stringhe
 * generate via JavaScript (parola rotante nell'hero, portfolio,
 * messaggi del modulo) — tutto il resto del testo è nell'HTML
 * di ciascuna pagina.
 * ============================================================
 */
const LANG = typeof PAGE_LANG !== "undefined" ? PAGE_LANG : "it";

const UI_STRINGS = {
  it: {
    heroRotatorWords: ["siti web", "web app", "applicazioni mobile", "strumenti su misura"],
    portfolioVisitHint: "Visita il sito ↗",
    portfolioAriaLabel: (name) => `Apri il sito di ${name} (si apre in una nuova scheda)`,
    portfolioAlt: (name) => `Anteprima di ${name}`,
    mailSubject: "Nuova richiesta dal sito",
    mailLabels: { name: "Nome e cognome", business: "Attività", email: "Email", category: "Categoria", projectType: "Tipo di progetto", hasSite: "Ha già un sito web", message: "Messaggio" },
    formOpening: (email) => `Si sta aprendo il tuo programma di posta con il messaggio già pronto per <strong>${email}</strong>: premi Invia lì per completare la richiesta. Se non si apre automaticamente, scrivici direttamente a <a href="mailto:${email}">${email}</a>.`,
  },
  en: {
    heroRotatorWords: ["websites", "web apps", "mobile apps", "custom tools"],
    portfolioVisitHint: "Visit the site ↗",
    portfolioAriaLabel: (name) => `Open the ${name} website (opens in a new tab)`,
    portfolioAlt: (name) => `Preview of ${name}`,
    mailSubject: "New request from the website",
    mailLabels: { name: "Full name", business: "Business", email: "Email", category: "Category", projectType: "Project type", hasSite: "Already has a website", message: "Message" },
    formOpening: (email) => `Your email app is opening with the message ready for <strong>${email}</strong>: hit Send there to complete your request. If it doesn't open automatically, write to us directly at <a href="mailto:${email}">${email}</a>.`,
  },
  de: {
    heroRotatorWords: ["Websites", "Web-Apps", "mobile Apps", "individuelle Tools"],
    portfolioVisitHint: "Website besuchen ↗",
    portfolioAriaLabel: (name) => `Website von ${name} öffnen (öffnet sich in einem neuen Tab)`,
    portfolioAlt: (name) => `Vorschau von ${name}`,
    mailSubject: "Neue Anfrage von der Website",
    mailLabels: { name: "Vor- und Nachname", business: "Unternehmen", email: "E-Mail", category: "Kategorie", projectType: "Art des Projekts", hasSite: "Hat bereits eine Website", message: "Nachricht" },
    formOpening: (email) => `Dein E-Mail-Programm öffnet sich mit der bereits vorbereiteten Nachricht an <strong>${email}</strong>: klicke dort auf Senden, um die Anfrage abzuschließen. Falls es sich nicht automatisch öffnet, schreib uns direkt an <a href="mailto:${email}">${email}</a>.`,
  },
  fr: {
    heroRotatorWords: ["sites web", "applications web", "applications mobiles", "outils sur mesure"],
    portfolioVisitHint: "Visiter le site ↗",
    portfolioAriaLabel: (name) => `Ouvrir le site de ${name} (s'ouvre dans un nouvel onglet)`,
    portfolioAlt: (name) => `Aperçu de ${name}`,
    mailSubject: "Nouvelle demande depuis le site",
    mailLabels: { name: "Nom et prénom", business: "Activité", email: "Email", category: "Catégorie", projectType: "Type de projet", hasSite: "A déjà un site web", message: "Message" },
    formOpening: (email) => `Votre application de messagerie s'ouvre avec le message déjà prêt pour <strong>${email}</strong> : cliquez sur Envoyer pour finaliser la demande. Si elle ne s'ouvre pas automatiquement, écrivez-nous directement à <a href="mailto:${email}">${email}</a>.`,
  },
  es: {
    heroRotatorWords: ["sitios web", "aplicaciones web", "aplicaciones móviles", "herramientas a medida"],
    portfolioVisitHint: "Visitar el sitio ↗",
    portfolioAriaLabel: (name) => `Abrir el sitio de ${name} (se abre en una pestaña nueva)`,
    portfolioAlt: (name) => `Vista previa de ${name}`,
    mailSubject: "Nueva solicitud desde el sitio web",
    mailLabels: { name: "Nombre y apellidos", business: "Negocio", email: "Email", category: "Categoría", projectType: "Tipo de proyecto", hasSite: "Ya tiene un sitio web", message: "Mensaje" },
    formOpening: (email) => `Se está abriendo tu aplicación de correo con el mensaje ya preparado para <strong>${email}</strong>: pulsa Enviar allí para completar la solicitud. Si no se abre automáticamente, escríbenos directamente a <a href="mailto:${email}">${email}</a>.`,
  },
};

const T = UI_STRINGS[LANG] || UI_STRINGS.it;

document.addEventListener("DOMContentLoaded", () => {
  injectConfigData();
  setupStickyHeader();
  setupMobileNav();
  setupFaqAccordion();
  renderPortfolio();
  renderPortfolio("portfolio-teaser-grid", 1);
  setupDonationButton();
  setupPortfolioFilters();
  setupHeroRotator();
  setupHeroParallax();
  setupScrollReveal();
  setupContactForm();
  document.getElementById("footer-year").textContent = new Date().getFullYear();
});

/* ------------------------------------------------------------
   Inietta i dati di config.js in tutti gli elementi con
   attributo data-config (email, telefono, social...)
   ------------------------------------------------------------ */
function injectConfigData() {
  if (typeof SITE_CONFIG === "undefined") return;

  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    const value = SITE_CONFIG[key];
    if (!value) return;

    el.textContent = value;

    const hrefType = el.getAttribute("data-config-href");
    if (hrefType === "mailto:") {
      el.setAttribute("href", `mailto:${value}`);
    } else if (hrefType === "whatsapp1") {
      el.setAttribute("href", SITE_CONFIG.whatsapp1Url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else if (hrefType === "whatsapp2") {
      el.setAttribute("href", SITE_CONFIG.whatsapp2Url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  // Social nella sezione contatti — mostrati solo se valorizzati in config.js
  const socialsWrap = document.getElementById("contact-socials");
  if (socialsWrap) {
    const socials = [
      { url: SITE_CONFIG.instagramUrl, label: "Instagram" },
      { url: SITE_CONFIG.linkedinUrl, label: "LinkedIn" },
    ];
    socials.forEach((s) => {
      if (!s.url) return;
      const a = document.createElement("a");
      a.href = s.url;
      a.textContent = s.label;
      a.target = "_blank";
      a.rel = "noopener";
      socialsWrap.appendChild(a);
    });
  }
}

/* ------------------------------------------------------------
   Header sticky: aggiunge un'ombra sottile dopo lo scroll
   ------------------------------------------------------------ */
function setupStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ------------------------------------------------------------
   Menu mobile a comparsa
   ------------------------------------------------------------ */
function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const backdrop = document.getElementById("nav-backdrop");
  if (!toggle || !links || !backdrop) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    links.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener("click", closeMenu);

  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ------------------------------------------------------------
   Accordion FAQ
   ------------------------------------------------------------ */
function setupFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    const answer = btn.nextElementSibling;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Chiude le altre risposte aperte
      document.querySelectorAll(".faq-question").forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
    });
  });
}

/* ------------------------------------------------------------
   Portfolio: generazione card da js/portfolio-data.js
   ------------------------------------------------------------ */
function renderPortfolio(containerId, limit) {
  containerId = containerId || "portfolio-grid";
  const grid = document.getElementById(containerId);
  if (!grid || typeof PORTFOLIO_PROJECTS === "undefined") return;

  grid.innerHTML = "";

  // Sulla pagina Portfolio completa mostriamo anche i progetti "in arrivo".
  // Nell'anteprima in home (quando è impostato un limite) mostriamo solo
  // progetti reali, per non aprire la homepage con placeholder vuoti.
  let projects = limit
    ? PORTFOLIO_PROJECTS.filter((p) => !p.placeholder).slice(0, limit)
    : PORTFOLIO_PROJECTS;

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "portfolio-card" + (project.placeholder ? " is-placeholder" : "");
    card.setAttribute("data-category", project.category);

    const name = localize(project.name);
    const categoryLabel = localize(project.categoryLabel);
    const description = localize(project.description);

    const techHtml = project.tech && project.tech.length
      ? `<div class="portfolio-tech">${project.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
      : "";

    // Se il progetto ha un link, l'intera miniatura diventa cliccabile e apre il sito
    // (l'apertura del sito passa solo da qui, niente link ripetuto anche sotto)
    const thumbInner = coverContent(project, name);
    const thumbHtml = project.link
      ? `<a class="portfolio-thumb" href="${escapeHtml(project.link)}" target="_blank" rel="noopener" aria-label="${escapeHtml(T.portfolioAriaLabel(name))}">
           ${thumbInner}
           <span class="portfolio-thumb-hint">${T.portfolioVisitHint}</span>
         </a>`
      : `<div class="portfolio-thumb">${thumbInner}</div>`;

    card.innerHTML = `
      ${thumbHtml}
      <div class="portfolio-body">
        <span class="portfolio-tag">${escapeHtml(categoryLabel)}</span>
        <h3 class="portfolio-name">${escapeHtml(name)}</h3>
        ${description ? `<p class="portfolio-desc">${escapeHtml(description)}</p>` : ""}
        ${techHtml}
      </div>
    `;

    grid.appendChild(card);
  });
}

/* Estrae la stringa nella lingua corrente da un campo { it, en, de, fr, es },
   con l'italiano come ripiego. Se il valore è già una stringa semplice
   (es. i nomi delle tecnologie), viene restituito così com'è. */
function localize(field) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[LANG] || field.it || "";
}

/**
 * Copertina di ogni card. Se il progetto ha un'immagine reale
 * (campo "image" in portfolio-data.js), viene usata quella.
 * Altrimenti viene mostrata un'illustrazione in stile "disegno
 * tecnico" — dedicata per "Le Dimore di Enea", oppure generica
 * per categoria per gli altri progetti.
 */
function coverContent(project, name) {
  if (project.image) {
    const base = typeof ASSET_BASE !== "undefined" ? ASSET_BASE : "";
    return `<img src="${escapeHtml(base + project.image)}" alt="${escapeHtml(T.portfolioAlt(name))}" loading="lazy" width="800" height="600" />`;
  }
  if (name === "Le Dimore di Enea") {
    return buildingSvg();
  }
  return categorySvg(project.category);
}

/* Illustrazione dedicata: una struttura ricettiva, in stile blueprint */
function buildingSvg() {
  return `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 130V70L100 34L160 70V130" fill="none" stroke="#223A5E" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M40 70H160" stroke="#223A5E" stroke-width="1" opacity="0.5"/>
      <rect x="60" y="86" width="24" height="24" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.6"/>
      <rect x="116" y="86" width="24" height="24" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.6"/>
      <path d="M92 130V96H108V130" fill="none" stroke="#223A5E" stroke-width="1.2"/>
      <path d="M20 130H180" stroke="#223A5E" stroke-width="1.4"/>
    </svg>
  `;
}

/* Icone generiche in stile blueprint, una per categoria di progetto */
function categorySvg(category) {
  const icons = {
    sito: `<rect x="30" y="34" width="140" height="90" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.5"/>
           <path d="M30 54h140M30 34v90" stroke="#223A5E" stroke-width="1" opacity="0.3"/>
           <circle cx="42" cy="44" r="2.5" fill="#223A5E" opacity="0.5"/>`,
    webapp: `<rect x="34" y="30" width="132" height="98" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.5"/>
             <path d="M34 52h132" stroke="#223A5E" stroke-width="1" opacity="0.3"/>
             <rect x="48" y="66" width="30" height="46" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.5"/>
             <rect x="86" y="80" width="66" height="32" fill="none" stroke="#223A5E" stroke-width="1" opacity="0.5"/>`,
    app: `<rect x="72" y="24" width="56" height="102" rx="8" fill="none" stroke="#223A5E" stroke-width="1.2" opacity="0.6"/>
          <path d="M72 42h56M72 108h56" stroke="#223A5E" stroke-width="1" opacity="0.35"/>`,
    strumento: `<circle cx="100" cy="75" r="30" fill="none" stroke="#223A5E" stroke-width="1.2" opacity="0.55"/>
                <path d="M100 45v10M100 95v10M70 75h10M120 75h10M79 54l7 7M114 89l7 7M121 54l-7 7M86 89l-7 7" stroke="#223A5E" stroke-width="1" opacity="0.4"/>`,
  };
  const icon = icons[category] || icons.sito;
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${icon}</svg>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ------------------------------------------------------------
   Hero: parola rotante ("siti web" / "web app" / ...)
   ------------------------------------------------------------ */
function setupHeroRotator() {
  const el = document.getElementById("hero-rotator");
  if (!el) return;

  const words = T.heroRotatorWords;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // resta sulla prima parola, già presente nell'HTML

  let index = 0;
  setInterval(() => {
    index = (index + 1) % words.length;
    el.classList.add("is-swapping");
    setTimeout(() => {
      el.textContent = words[index];
      el.classList.remove("is-swapping");
    }, 220);
  }, 2400);
}

/* ------------------------------------------------------------
   Hero: leggero effetto parallax sull'illustrazione, al movimento del mouse
   ------------------------------------------------------------ */
function setupHeroParallax() {
  const visual = document.querySelector(".hero-visual img, .hero-visual svg");
  if (!visual) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return; // salta su touch

  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    visual.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    visual.style.transform = "translate(0, 0)";
  });
}

/* ------------------------------------------------------------
   Rivelazione dei contenuti allo scroll (una volta sola, per sezione)
   ------------------------------------------------------------ */
function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ------------------------------------------------------------
   Pulsante "Aiutaci a crescere": lo collega al link di pagamento
   impostato in config.js. Se non è ancora stato configurato,
   il pulsante resta nascosto invece di puntare a un link finto.
   ------------------------------------------------------------ */
function setupDonationButton() {
  const config = [
    { id: "donation-btn-revolut", key: "donationUrlRevolut" },
    { id: "donation-btn-paypal", key: "donationUrlPaypal" },
    { id: "donation-btn-stripe", key: "donationUrlStripe" },
  ];

  config.forEach(({ id, key }) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    const url = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG[key] : "";
    if (url) {
      btn.setAttribute("href", url);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
    } else {
      btn.style.display = "none";
    }
  });
}

/* ------------------------------------------------------------
   Filtro portfolio per categoria
   ------------------------------------------------------------ */
function setupPortfolioFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("portfolio-grid");
  if (!buttons.length || !grid) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      grid.querySelectorAll(".portfolio-card").forEach((card) => {
        const show = filter === "tutti" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* ------------------------------------------------------------
   Modulo di contatto: apre il programma di posta del visitatore
   con un'email già compilata verso SITE_CONFIG.email (mailto),
   così ogni richiesta arriva come una vera email, senza bisogno
   di servizi esterni a pagamento.
   In parallelo, la richiesta viene comunque inviata (in modo
   silenzioso, senza bloccare né condizionare l'esito mostrato
   all'utente) anche via Resend come copia di backup, così arriva
   anche se il visitatore non completa l'invio dal proprio
   programma di posta.
   ------------------------------------------------------------ */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Backup silenzioso via Resend — non condiziona in alcun modo
    // il messaggio mostrato all'utente qui sotto.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => {});

    // Apre il programma di posta con l'email già pronta
    const email = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.email : "";
    const mailBody = buildMailBody(form);
    const nome = (form.querySelector("#nome") || {}).value || "";
    const subject = nome ? `${T.mailSubject} — ${nome}` : T.mailSubject;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

    status.className = "form-status is-success";
    status.innerHTML = T.formOpening(email);

    window.location.href = mailtoUrl;
  });
}

/* Compone il corpo del messaggio email a partire dai campi compilati */
function buildMailBody(form) {
  const get = (id) => (form.querySelector(`#${id}`) || {}).value || "";
  const radio = form.querySelector('input[name="sito_esistente"]:checked');
  const L = T.mailLabels;

  const lines = [
    `${L.name}: ${get("nome")}`,
    get("attivita") ? `${L.business}: ${get("attivita")}` : null,
    `${L.email}: ${get("email")}`,
    get("categoria") ? `${L.category}: ${get("categoria")}` : null,
    `${L.projectType}: ${get("tipo-progetto")}`,
    `${L.hasSite}: ${radio ? radio.value : ""}`,
    "",
    `${L.message}:`,
    get("messaggio"),
  ];

  return lines.filter((l) => l !== null).join("\n");
}
