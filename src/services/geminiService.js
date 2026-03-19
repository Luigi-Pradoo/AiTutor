const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(prompt) {
  if (!API_KEY) {
    console.warn("VITE_GEMINI_API_KEY not set — using fallback data");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) {
      console.error("Gemini API error:", res.status);
      return null;
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return null;
  }
}

// ========== QUIZ BATCH ==========

const FALLBACK_QUIZ_BATCH = [
  {
    question: "Como se diz 'Bom dia' em inglês?",
    phrase: "Bom dia",
    options: [
      { key: "A", text: "Good night" },
      { key: "B", text: "Good morning" },
      { key: "C", text: "Good afternoon" },
      { key: "D", text: "Goodbye" },
    ],
    correctKey: "B",
  },
  {
    question: "Traduza para o inglês: 'Obrigado'",
    phrase: "Obrigado",
    options: [
      { key: "A", text: "Please" },
      { key: "B", text: "Sorry" },
      { key: "C", text: "Thank you" },
      { key: "D", text: "Hello" },
    ],
    correctKey: "C",
  },
  {
    question: "Como pedir desculpas em inglês?",
    phrase: "Me desculpe",
    options: [
      { key: "A", text: "I'm sorry" },
      { key: "B", text: "Excuse me" },
      { key: "C", text: "Pardon" },
      { key: "D", text: "Forgive me" },
    ],
    correctKey: "A",
  },
  {
    question: "Qual é a tradução de 'Por favor'?",
    phrase: "Por favor",
    options: [
      { key: "A", text: "Thanks" },
      { key: "B", text: "Welcome" },
      { key: "C", text: "Please" },
      { key: "D", text: "Yes" },
    ],
    correctKey: "C",
  },
  {
    question: "Como você diz 'Sim'?",
    phrase: "Sim",
    options: [
      { key: "A", text: "No" },
      { key: "B", text: "Maybe" },
      { key: "C", text: "Yes" },
      { key: "D", text: "Always" },
    ],
    correctKey: "C",
  },
];

export async function generateQuizBatch(targetLanguage, nativeLanguage = "Português", count = 5) {
  const prompt = `You are a language tutor. Generate a quiz with ${count} multiple-choice translation questions for a student learning ${targetLanguage} whose native language is ${nativeLanguage}.

Return ONLY valid JSON as an array in this exact format:
[
  {
    "question": "instruction text telling student what to do in ${nativeLanguage}",
    "phrase": "the phrase to translate in ${targetLanguage}",
    "options": [
      {"key": "A", "text": "wrong answer"},
      {"key": "B", "text": "correct answer"},
      {"key": "C", "text": "wrong answer"},
      {"key": "D", "text": "wrong answer"}
    ],
    "correctKey": "B"
  }
]

RULES:
- Generate EXACTLY ${count} questions in the array
- The phrase should be in ${targetLanguage}
- The options should be translations in ${nativeLanguage}
- Randomize which key (A/B/C/D) is correct
- Keep it appropriate for beginner level`;

  const result = await callGemini(prompt);
  return Array.isArray(result) && result.length > 0 ? result : FALLBACK_QUIZ_BATCH;
}


// ========== VOCABULARY ==========

const FALLBACK_VOCAB = {
  words: [
    { word: "Hello", translation: "Olá", example: "Hello, how are you?" },
    { word: "Thank you", translation: "Obrigado", example: "Thank you very much!" },
    { word: "Please", translation: "Por favor", example: "Please sit down." },
    { word: "Goodbye", translation: "Adeus", example: "Goodbye, see you later!" },
    { word: "Yes", translation: "Sim", example: "Yes, I understand." },
    { word: "No", translation: "Não", example: "No, thank you." },
  ],
  topic: "Saudações básicas",
};

export async function generateVocabulary(targetLanguage, nativeLanguage = "Português") {
  const prompt = `You are a language tutor. Generate a vocabulary practice set of 6 words for a student learning ${targetLanguage} whose native language is ${nativeLanguage}.

Return ONLY valid JSON in this exact format:
{
  "words": [
    {"word": "word in ${targetLanguage}", "translation": "translation in ${nativeLanguage}", "example": "example sentence using the word in ${targetLanguage}"},
    ... (6 words total)
  ],
  "topic": "short topic description in ${nativeLanguage}"
}

RULES:
- Choose a random common topic (greetings, food, family, colors, numbers, animals, daily activities, travel, etc)
- Words should be beginner level
- Each word must have a simple example sentence in ${targetLanguage}
- The topic name should be in ${nativeLanguage}`;

  const result = await callGemini(prompt);
  return result || FALLBACK_VOCAB;
}

// ========== CONVERSATION ==========

const FALLBACK_CONVERSATION = {
  greeting: "Hello! How are you today?",
  translation: "Olá! Como você está hoje?",
  suggestions: [
    "I'm fine, thank you!",
    "I'm learning a new language.",
    "What's your name?",
  ],
};

export async function generateConversation(targetLanguage, nativeLanguage = "Português") {
  const prompt = `You are a friendly language tutor. Start a simple conversation in ${targetLanguage} for a beginner student whose native language is ${nativeLanguage}.

Return ONLY valid JSON in this exact format:
{
  "greeting": "a greeting or conversation starter in ${targetLanguage}",
  "translation": "translation of the greeting in ${nativeLanguage}",
  "suggestions": ["response option 1 in ${targetLanguage}", "response option 2 in ${targetLanguage}", "response option 3 in ${targetLanguage}"]
}

RULES:
- Keep it very simple and beginner-friendly
- The suggestions should be simple responses the student can try saying`;

  const result = await callGemini(prompt);
  return result || FALLBACK_CONVERSATION;
}

// ========== CHAT WITH TUTOR (Multi-turn) ==========

async function callGeminiChat(messages, systemInstruction) {
  if (!API_KEY) {
    return null;
  }

  try {
    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("Chat error:", err);
    return null;
  }
}

export async function chatWithTutor(chatHistory, targetLanguage, studentName) {
  const systemPrompt = `You are a friendly, patient, and encouraging language tutor named Sofia. You are teaching ${targetLanguage} to a Brazilian Portuguese speaker named ${studentName || "aluno"}.

RULES:
- Speak primarily in ${targetLanguage}, but use simple words a beginner can understand
- After each message in ${targetLanguage}, include a translation in Portuguese in parentheses
- If the student makes a mistake, gently correct them and explain why
- Ask questions to keep the conversation going
- Use encouraging language and emojis occasionally
- Keep responses short (2-3 sentences max)
- If the student writes in Portuguese, respond in ${targetLanguage} with the translation and gently encourage them to try in ${targetLanguage}
- Act like a real person having a natural conversation, not a robot`;

  const result = await callGeminiChat(chatHistory, systemPrompt);
  return result || `Hello! I'm Sofia, your ${targetLanguage} tutor. How are you today? (Olá! Eu sou a Sofia, sua tutora de ${targetLanguage}. Como você está hoje?) 😊`;
}
