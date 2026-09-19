export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, attivita, email, categoria, tipo_progetto, sito_esistente, messaggio } = req.body || {};

  if (!nome || !email || !messaggio) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: process.env.OWNER_EMAIL,
        reply_to: email,
        subject: `Nuova richiesta dal sito — ${nome}`,
        text: `Nome: ${nome}\nAttività: ${attivita || '-'}\nEmail: ${email}\nCategoria: ${categoria || '-'}\nTipo progetto: ${tipo_progetto || '-'}\nHa già un sito: ${sito_esistente || '-'}\n\nMessaggio:\n${messaggio}`,
      }),
    });
    if (!r.ok) throw new Error(await r.text());
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Invio fallito' });
  }
}
