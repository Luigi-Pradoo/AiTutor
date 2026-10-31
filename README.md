<div align="center">

<img src="public/robot_tutor.png" width="120" alt="AiTutor" />

# AiTutor

**Tutor de idiomas com Inteligência Artificial — aprenda praticando, no seu ritmo.**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-instalável-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

Projeto desenvolvido para a **FETIN 2026** (Feira Tecnológica do INATEL).

</div>

---

## 💡 O que é

O AiTutor é um aplicativo web progressivo (PWA) que funciona como um **professor particular de idiomas**. Em vez de lições fixas, o conteúdo é **gerado na hora pela IA do Google Gemini**, adaptado ao idioma que o aluno quer aprender e à sua língua nativa.

## ✨ Funcionalidades

| | Recurso | Como funciona |
|---|---|---|
| 📝 | **Quizzes personalizados** | Questões de múltipla escolha de tradução geradas sob medida |
| 📚 | **Vocabulário** | Conjuntos de palavras novas para praticar a cada sessão |
| 💬 | **Conversação** | Diálogos guiados para iniciantes no idioma escolhido |
| 🤖 | **Chat com o tutor** | Converse livremente com a IA, que corrige e explica |
| 🎙️ | **Prática por voz** | Segure para falar, ouça de novo e ajuste a velocidade da fala |
| 📈 | **Progresso** | Atividades concluídas e sequência de dias seguidos |
| 📲 | **Instalável** | Funciona como app no celular graças ao PWA |

> Sem chave de API configurada, o app continua funcionando com dados de exemplo — útil para demonstração.

---

## 🏗️ Arquitetura

```
src/
├── pages/            # Telas: Login, Register, Home, Aula, Activity, Progress, Profile
├── screens/          # Versões das telas organizadas por fluxo (auth / main)
├── components/       # Botões, inputs, cards, navegação inferior, fundo animado
├── navigation/       # AuthStack e MainTabs (React Router)
├── context/          # UserContext — estado global do aluno
└── services/
    └── geminiService.js   # Geração de quiz, vocabulário, conversa e chat via Gemini
```

## 🚀 Como rodar

Requisitos: **Node.js 18+**

```bash
git clone https://github.com/Luigi-Pradoo/AiTutor.git
cd AiTutor
npm install
```

Crie um arquivo `.env` na raiz com sua chave do [Google AI Studio](https://aistudio.google.com/app/apikey):

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

```bash
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

> ⚠️ Como é um app só de front-end, a chave fica exposta no navegador. Para produção, o ideal é mover as chamadas ao Gemini para uma função serverless.

---

## 👨‍💻 Autor

**Luigi Prado** — Engenharia de Telecomunicações @ INATEL · [GitHub](https://github.com/Luigi-Pradoo) · [LinkedIn](https://linkedin.com/in/luigi-prado-raimundo)
