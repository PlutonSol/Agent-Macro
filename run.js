import fs from "fs";
import { analyze } from "./agent.js";

const fakeNews = `
Macro US : discussions sur les taux et l’inflation.
Métaux : évolution de l’or.
Crypto : actualité régulation et sentiment de marché.
`;

const result = await analyze(fakeNews);

fs.writeFileSync(
  "analysis.json",
  JSON.stringify(
    {
      date: new Date().toISOString(),
      content: result
    },
    null,
    2
  )
);
