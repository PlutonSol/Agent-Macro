name: Agent Macro Auto

# Déclenchement toutes les heures
on:
  schedule:
    - cron: '0 * * * *' # toutes les heures
  workflow_dispatch:    # permet de lancer manuellement

jobs:
  run-agent:
    runs-on: ubuntu-latest

    steps:
      # 1️⃣ Récupérer le code du repo
      - name: Checkout repository
        uses: actions/checkout@v3

      # 2️⃣ Installer Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      # 3️⃣ Installer les dépendances
      - name: Install dependencies
        run: npm install openai

      # 4️⃣ Lancer l'agent
      - name: Run Agent
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          node agent.js

      # ⚠️ Section de commit supprimée pour éviter l'erreur 403
