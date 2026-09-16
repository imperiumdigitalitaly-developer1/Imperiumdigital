# Imperium Digital — sito vetrina

Sito statico in HTML/CSS/JavaScript puro. Nessun framework, nessun
build step: si pubblica così com'è.

Il sito è **multi-pagina**: home page più leggera con link alle pagine
di dettaglio (Come funziona, Servizi, Portfolio, FAQ, Contatti),
raggiungibili dalla barra di navigazione in alto.

## Struttura del progetto

```
index.html               Home (italiano) — versione sintetica con link alle altre pagine
come-funziona.html         I 4 passaggi del processo
servizi.html                 Cosa possiamo creare + cosa include ogni progetto
portfolio.html                 Portfolio completo con filtri
faq.html                         Tutte le domande frequenti
contatti.html                      Info di contatto + modulo

en/  de/  fr/  es/         Stessa struttura di pagine, tradotta (nomi file
                            adattati alla lingua, es. en/how-it-works.html,
                            de/ablauf.html — vedi sotto)

privacy.html         Privacy Policy (contenuto segnaposto, solo italiano)
cookie.html           Cookie Policy (contenuto segnaposto, solo italiano)
grazie.html            Pagina di ringraziamento (non più collegata al form, vedi sotto)
css/style.css            Tutti gli stili + variabili colore/tipografia (condiviso da tutte le pagine e lingue)
js/config.js               Dati di contatto, social, nome del progetto (condiviso)
js/portfolio-data.js         Progetti del portfolio, con testi in tutte le lingue (condiviso)
js/main.js                    Interazioni + testi d'interfaccia per lingua (condiviso)
assets/favicon.svg              Icona del sito (marchio Imperium Digital)
assets/og-image.jpg              Immagine di copertina per la condivisione social, basata sul logo
assets/logo-full.svg            Logo completo (marchio + naming), su sfondo chiaro
assets/logo-full-light.svg      Logo completo, versione per sfondi scuri
robots.txt, sitemap.xml           SEO tecnico (con indicazioni hreflang per le 5 lingue × 6 pagine)
netlify.toml                        Configurazione di deploy
```

### Nomi dei file per lingua

Ogni lingua usa nomi di pagina nella propria lingua (comune per la SEO
multilingua). La mappa completa:

| Pagina | IT | EN | DE | FR | ES |
|---|---|---|---|---|---|
| Come funziona | `come-funziona.html` | `en/how-it-works.html` | `de/ablauf.html` | `fr/comment-ca-marche.html` | `es/como-funciona.html` |
| Servizi | `servizi.html` | `en/services.html` | `de/leistungen.html` | `fr/services.html` | `es/servicios.html` |
| Portfolio | `portfolio.html` | `en/portfolio.html` | `de/portfolio.html` | `fr/portfolio.html` | `es/portfolio.html` |
| FAQ | `faq.html` | `en/faq.html` | `de/faq.html` | `fr/faq.html` | `es/faq.html` |
| Contatti | `contatti.html` | `en/contact.html` | `de/kontakt.html` | `fr/contact.html` | `es/contacto.html` |

Il selettore lingua (in basso a sinistra) porta sempre alla pagina
equivalente nella lingua scelta, non solo alla home.


## Le versioni in altre lingue

Il sito è disponibile in italiano (alla radice), inglese, tedesco,
francese e spagnolo, con un selettore lingua (pillola in basso a
sinistra) presente su tutte le pagine.

**Cosa cambia per lingua**: tutto il testo visibile è scritto per
intero in ciascun file `en/index.html`, `de/index.html`,
`fr/index.html`, `es/index.html`. **Cosa resta condiviso**: CSS, script,
immagini e — soprattutto — i dati del portfolio e i dati di contatto.
In pratica:

- Se aggiorni `js/config.js` (email, telefono, Instagram), il
  cambiamento si vede automaticamente su tutte le 5 versioni.
- Se aggiungi un progetto in `js/portfolio-data.js`, scrivendo nome,
  categoria e descrizione nei 5 campi di lingua (`it`, `en`, `de`,
  `fr`, `es`), compare automaticamente — tradotto — su tutte le
  versioni.
- Se invece devi modificare un testo "fisso" della pagina (un
  titolo, una domanda delle FAQ, una voce del menu), va cambiato a
  mano in ciascun file linguistico separatamente: sono pagine HTML
  indipendenti, non generate automaticamente da un'unica fonte.

**Nota importante**: `privacy.html` e `cookie.html` esistono solo in
italiano. I link "Privacy Policy" nelle versioni straniere puntano
comunque a quelle pagine italiane — ho preferito non tradurre
automaticamente un testo legale che dovrebbe comunque essere
verificato da un professionista. Se vuoi, posso preparare anche le
versioni tradotte una volta che il testo legale definitivo sarà
pronto.

## Cosa modificare per primo

1. **`js/config.js`** — email, i due numeri WhatsApp, Instagram, URL del
   sito. È l'unico file da aggiornare per i dati di contatto: si
   propagano automaticamente ovunque nel sito. Il link Instagram che mi
   hai fornito contiene parametri di tracciamento (`?stkn=...&utm_source=qr`,
   tipici di un link condiviso dall'app): per un link permanente sul sito
   valuta se sostituirlo con l'indirizzo pulito del profilo
   (`https://www.instagram.com/_imperiumdigital`) — funzionalmente
   sono equivalenti, ma quello pulito non scade e non altera le
   statistiche del profilo.
2. **`js/portfolio-data.js`** — aggiungi un nuovo progetto copiando un
   blocco `{ ... }` esistente. Appare automaticamente nella sezione
   Portfolio, con la card e il filtro già funzionanti.
3. **Il nome "Imperium Digital"** è già definitivo e compare nel
   `<title>`, nella hero, nella nav e nel footer di `index.html`
   (di proposito non è generato via JavaScript, per non penalizzare
   la SEO: se dovesse cambiare ancora, va aggiornato con
   trova-e-sostituisci in questi punti).
4. **Colori** — variabili `:root` in cima a `css/style.css`
   (`--ink`, `--paper`, `--blueprint`, `--stone`, `--line`).
5. **Copertine reali del portfolio** — al momento ogni progetto mostra
   un'illustrazione SVG in stile "disegno tecnico" (dedicata per Le
   Dimore di Enea, per icona di categoria per gli altri). Per usare
   uno screenshot vero del sito, aggiungi l'immagine dentro `assets/`
   e valorizza il campo `image` del progetto in
   `js/portfolio-data.js` (es. `image: "assets/le-dimore-di-enea.jpg"`):
   compare automaticamente al posto dell'illustrazione. I progetti con
   un `link` impostato hanno già la miniatura cliccabile, che apre il
   sito in una nuova scheda.
6. **`assets/og-image.jpg`** — già pronta (1200×630px, basata sul logo).
   Se in futuro cambiate il logo, va rigenerata e i riferimenti
   `og:image` restano invariati (stesso nome file).
7. **Dominio** — il sito usa già il dominio reale
   `https://imperiumdigitalitalia.it` in tutti i file SEO (canonical,
   Open Graph, hreflang, `robots.txt`, `sitemap.xml`, dati strutturati).
   Se il dominio dovesse cambiare in futuro, andrebbe sostituito in
   tutti questi punti.
8. **Privacy e Cookie Policy** — i testi in `privacy.html` e
   `cookie.html` sono segnaposto (evidenziati con un riquadro). Vanno
   sostituiti con un'informativa redatta o verificata da un
   professionista prima della pubblicazione.
9. **Partita IVA / dati legali** — placeholder nel footer di
   `index.html`.

## Pubblicazione su Netlify

1. Carica questa cartella su un repository GitHub.
2. Su Netlify: "Add new site" → "Import an existing project" → collega
   il repository. Non serve impostare un build command (il sito è già
   statico): lascialo vuoto e imposta `.` come publish directory
   (già preconfigurato in `netlify.toml`).
3. Il modulo di contatto in `index.html` invia ogni richiesta in due modi
   in parallelo:
   - apre il programma di posta del visitatore con un'email già
     compilata verso l'indirizzo in `js/config.js` (basta che il
     visitatore prema Invia lì) — **non richiede alcun piano a
     pagamento**, funziona con qualunque provider email;
   - invia in silenzio una copia della stessa richiesta anche a
     **Netlify Forms** (gratuito), visibile da Site settings → Forms
     sulla dashboard — utile come backup/archivio, indipendentemente
     dal fatto che il visitatore completi l'invio dell'email.
   Gli attributi richiesti da Netlify Forms (`data-netlify="true"`,
   campo honeypot anti-spam) sono già presenti nel form.
   **Importante**: la copia di backup su Netlify viene registrata solo
   una volta pubblicato davvero il sito — se apri i file in locale sul
   computer, quella parte non funziona (l'apertura del programma di
   posta invece sì, anche in locale).
4. Collega il tuo dominio da Site settings → Domain management.

## Il logo

Il marchio unisce una colonna romana stilizzata (asta, base, capitello)
a un piccolo gradino nel capitello che richiama una traccia di
circuito — un segno solo, sobrio, senza clip-art. Lo trovi in tre
formati, tutti vettoriali (si ridimensionano senza perdere qualità):

- `assets/favicon.svg` — solo marchio, per l'icona del sito
- `assets/logo-full.svg` — marchio + naming, su sfondo chiaro
- `assets/logo-full-light.svg` — marchio + naming, per sfondi scuri
  (es. copertina Instagram, materiali di presentazione)

## Animazioni

Per non risultare un sito puramente statico, sono presenti tre
micro-interazioni pensate per restare discrete:

- una parola che cambia nell'hero ("realizziamo *siti web / web app /
  applicazioni mobile / strumenti su misura*")
- un leggero effetto di profondità sull'illustrazione dell'hero, al
  movimento del mouse (solo desktop)
- una comparsa morbida dei contenuti mentre si scorre la pagina

Tutte si disattivano automaticamente se il visitatore ha impostato
"riduci animazioni" nel proprio dispositivo.

## Note tecniche

- Font caricati da Google Fonts (Bricolage Grotesque + IBM Plex Sans),
  nessun altro servizio esterno a pagamento.
- Il sito rispetta `prefers-reduced-motion` e ha stati di focus
  visibili per la navigazione da tastiera.
- La sezione Portfolio è generata via JavaScript: senza JavaScript
  attivo compare un messaggio alternativo (`<noscript>`); il resto del
  sito (contenuti, form, navigazione) resta leggibile e utilizzabile.
