/**
 * ============================================================
 * CONFIGURAZIONE DEL SITO — unico punto da modificare
 * ============================================================
 * Cambia qui nome, contatti, social e link.
 * Tutti i valori vengono inseriti automaticamente nelle pagine
 * tramite gli attributi data-config presenti nell'HTML
 * (es. <span data-config="email"></span>).
 *
 * Per cambiare i COLORI del sito, vai invece in css/style.css
 * e modifica le variabili dentro :root (righe iniziali del file).
 * ============================================================
 */

const SITE_CONFIG = {
  // Nome del progetto
  brandName: "Imperium Digital",
  brandTagline: "Siti e applicazioni su misura",

  // Dati di contatto — sostituisci i placeholder con i tuoi dati reali
  email: "imperiumdigitalitaly@gmail.com",

  // Numero di contatto (WhatsApp). Il "Number" è usato per il link wa.me,
  // il "Label" è il testo mostrato sul sito.
  phone1Label: "+39 389 535 6517",
  phone1Number: "393895356517",

  // Social — lascia vuoto ("") per nascondere il link dal footer/contatti
  instagramUrl: "https://www.instagram.com/_imperiumdigital?stkn=MXE3Zzl3cXR4YjI5bQ%3D%3D&utm_source=qr",
  linkedinUrl: "",

  // Link di pagamento per le donazioni ("Aiutaci a crescere" in Chi siamo).
  // Ognuno deve puntare a un vero elaboratore di pagamento con le vostre
  // coordinate già registrate come destinatario. Lascia vuoto ("") un campo
  // per nascondere il relativo pulsante.
  donationUrlRevolut: "https://revolut.me/giusepwcmy",
  donationUrlStripe: "https://buy.stripe.com/fZucN79hN8sE84CbrxefC00",

  // URL del sito una volta pubblicato (usato per meta tag, sitemap, JSON-LD)
  siteUrl: "https://imperiumdigitalitalia.it",

  // Località di riferimento (facoltativo, usato nei meta tag)
  location: "Italia",

  // Anno per il copyright — aggiornato automaticamente da main.js
  foundingYear: 2026,
};

// Costruisce automaticamente il link WhatsApp dal numero sopra
SITE_CONFIG.whatsapp1Url = `https://wa.me/${SITE_CONFIG.phone1Number}`;
