import OpenAI from "openai";
import fs from "fs";

// Crée un client OpenAI avec la clé de GitHub Actions
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyze(news) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Tu es un analyste macro-financier pédagogique.
Tu analyses l’actualité macro US, métaux et crypto.
Tu ne donnes aucun conseil d’investissement.
Tu écris en français clair.
          `
        },
        {
          role: "user",
          content: news
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erreur IA :", error);
    return "Impossible de générer l'analyse pour le moment.";
  }
}

// Génère le fichier analysis.json et affiche le contenu
export async function generateAnalysis() {
  const fakeNews = `
Macro US : discussions sur les taux et l’inflation.
Métaux : évolution de l’or et du cuivre.
Crypto : actualité régulation et sentiment de marché.
  `;

  const result = await analyze(fakeNews);

  const analysisData = {
    date: new Date().toISOString(),
    content: result
  };

  // Écrire le fichier pour usage local
  fs.writeFileSync("analysis.json", JSON.stringify(analysisData, null, 2));

  // Afficher le contenu dans les logs GitHub Actions
  console.log("✅ analysis.json généré avec succès !");
  console.log("----- Contenu pour copier -----");
  console.log(JSON.stringify(analysisData, null, 2));
  console.log("----- Fin du contenu -----");
}

// Si on lance directement node agent.js
if (import.meta.url === `file://${process.argv[1]}`) {

