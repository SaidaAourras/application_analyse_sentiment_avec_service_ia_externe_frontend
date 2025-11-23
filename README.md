# 🎨 Frontend – Sentiment Analysis App (Next.js)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🧠 Description du Frontend

Application web **Next.js + React + Tailwind CSS** pour analyser le sentiment d’un texte.  
Le frontend communique avec le backend **FastAPI** via API REST, utilise **JWT** pour l’authentification et affiche les résultats en temps réel.

---

## ⚙️ Installation Locale

```bash
git clone https://github.com/SaidaAourras/application_analyse_sentiment_avec_service_ia_externe_frontend.git
cd application_analyse_sentiment_avec_service_ia_externe_frontend
npm install
npm run dev

Frontend disponible sur :
👉 http://localhost:3000
```

## 🐳 Docker

**Construire l’image**

    docker build -t sentiment-frontend .

**Lancer le conteneur**

    docker run -d \
    -p 3000:3000 \
    sentiment-frontend

## 🖥️ Pages et Fonctionnalités

/login

- Formulaire de connexion

- Authentification via backend

- Stockage du JWT dans localStorage

/sentiment (protégée)

Formulaire pour saisir le texte à analyser

- Envoi au backend et 
- affichage du résultat en temps réel

## 📂 Structure du Frontend

    application_analyse_sentiment_avec_service_ia_externe_frontend/
    ├── src/
    │   ├── app/
    │   │   ├── auth/                # Authentification
    │   │   │   ├── login/           # Page login
    │   │   │   │   └── page.js
    │   │   │   └── register/        # Page register
    │   │   │       └── page.js
    │   │   └── sentiment/           # Page sentiment
    │   │       └── page.js
    │   │
    │   ├── layout.js
    │   └── page.js
    │
    ├── Dockerfile
    ├── package.json
    └── README.md


## 🛠️ Technologies

- Next.js 16.0.3

- React 19.2.0

- TypeScript

- Tailwind CSS

- Docker pour conteneurisation

## 📝 Commandes Utiles

    npm run dev      # Développement
    npm run build    # Build production
    npm start        # Démarrer production


## 🌐 Accès
- Développement : http://localhost:3000

- Production : selon configuration du serveur ou Docker

---

## 👩‍💻 **AOURRAS Saida**