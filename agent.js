import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyze(news) {
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
}
