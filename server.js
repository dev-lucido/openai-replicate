// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(express.json());

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.options("/v1/chat/completions", (req, res) => {
//   res.sendStatus(204);
// });

// app.post("/v1/chat/completions", async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {
//     const messages = req.body.messages || [];

//     const systemMessage = `
// You are MamaBot, a pregnancy and maternal health assistant.

// Allowed topics ONLY:
// - Pregnancy (all trimesters)
// - Prenatal care
// - Nutrition during pregnancy
// - Physical and emotional changes in pregnancy
// - Labor, delivery, and postpartum care
// - Newborn care (first months only)

// Disallowed topics:
// - Politics, religion, finance, programming, relationships unrelated to pregnancy
// - Mental health therapy outside pregnancy context
// - Any topic not directly related to pregnancy or maternal health

// If the user asks about a disallowed topic:
// - Politely refuse
// - Briefly state that you can only help with pregnancy-related topics
// - Offer to reframe the question into a pregnancy context

// You must never answer disallowed topics.
// Do not continue the conversation outside your role.
// `;

//     // Build prompt for the model
//     const prompt =
//       [systemMessage]
//         .concat(
//           messages.map((m) =>
//             m.role === "user"
//               ? `User: ${m.content}`
//               : `Assistant: ${m.content}`,
//           ),
//         )
//         .join("\n") + "\nAssistant: ";

//     // const prompt =
//     //   messages.map((m) => `${m.role}: ${m.content}`).join("\n") + " assistant:";

//     // ✅ THIS is the correct streaming API
//     const stream = await replicate.stream("meta/meta-llama-3-8b-instruct", {
//       input: {
//         prompt,
//         temperature: 0.4,
//         max_new_tokens: 400,
//       },
//     });

//     for await (const event of stream) {
//       if (event.event === "output") {
//         const token = String(event.data ?? "");

//         res.write(
//           `data: ${JSON.stringify({
//             choices: [
//               {
//                 delta: { content: token },
//               },
//             ],
//           })}\n\n`,
//         );
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.end();
//   }
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Server is running ✅",
//     timestamp: new Date(),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

//===================================== language ===========================================================

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.options("/v1/chat/completions", (req, res) => {
//   res.sendStatus(204);
// });

// app.post("/v1/chat/completions", async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {
//     const { messages = [], language = "en" } = req.body;

//     // 🔒 LANGUAGE ENFORCEMENT
//     let languageInstruction = "";
//     switch (language) {
//       case "si":
//         languageInstruction =
//           "Respond ONLY in Sinhala. Do not use English unless absolutely necessary.";
//         break;
//       case "ta":
//         languageInstruction =
//           "Respond ONLY in Tamil. Do not use English unless absolutely necessary.";
//         break;
//       default:
//         languageInstruction = "Respond ONLY in English.";
//     }

//     const systemMessage = `
// You are MamaBot, a pregnancy and maternal health assistant.

// ${languageInstruction}

// Allowed topics ONLY:
// - Pregnancy (all trimesters)
// - Prenatal care
// - Nutrition during pregnancy
// - Physical and emotional changes in pregnancy
// - Labor, delivery, and postpartum care
// - Newborn care (first months only)

// Disallowed topics:
// - Politics, religion, finance, programming, relationships unrelated to pregnancy
// - Mental health therapy outside pregnancy context
// - Any topic not directly related to pregnancy or maternal health

// Rules:
// - Stay strictly within allowed topics
// - Be calm, empathetic, and supportive
// - You are NOT a doctor
// - Do NOT provide diagnoses or prescriptions
// - If danger signs are mentioned (heavy bleeding, severe pain, fainting, fever, reduced baby movement),
//   advise seeking immediate medical care

// If the user asks about a disallowed topic:
// - Politely refuse
// - State you can only help with pregnancy-related topics
// - Invite them to ask a pregnancy-related question
// `;

//     // 🧠 PROMPT BUILDING
//     const prompt =
//       [systemMessage]
//         .concat(
//           messages.map((m) =>
//             m.role === "user"
//               ? `User: ${m.content}`
//               : `Assistant: ${m.content}`,
//           ),
//         )
//         .join("\n") + "\nAssistant:";

//     // 🚀 STREAMING RESPONSE
//     const stream = await replicate.stream("meta/meta-llama-3-8b-instruct", {
//       input: {
//         prompt,
//         temperature: 0.4,
//         max_new_tokens: 400,
//       },
//     });

//     for await (const event of stream) {
//       if (event.event === "output") {
//         res.write(
//           `data: ${JSON.stringify({
//             choices: [
//               {
//                 delta: { content: String(event.data ?? "") },
//               },
//             ],
//           })}\n\n`,
//         );
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.end();
//   }
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Server is running ✅",
//     timestamp: new Date(),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

// =========================================================================================================

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// app.options("/v1/chat/completions", (req, res) => {
//   res.sendStatus(204);
// });

// app.post("/v1/chat/completions", async (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {
//     const { messages = [], language = "en" } = req.body;

//     // 🔒 LANGUAGE ENFORCEMENT & MODEL SELECTION
//     let languageInstruction = "";
//     let modelId = "meta/meta-llama-3-8b-instruct"; // default for English

//     switch (language) {
//       case "si":
//         languageInstruction =
//           "ඔබ MamaBot, ගැබිනි සහ මාතෘ සෞඛ්‍ය සහායකයෙකි. සිංහලෙන් පමණක් පිළිතුරු දෙන්න.";
//         modelId = "pasindu-promodh/llama3-sinhala"; // 🎯 YOUR DEPLOYED MODEL
//         break;
//       case "ta":
//         languageInstruction =
//           "Respond ONLY in Tamil. Do not use English unless absolutely necessary.";
//         // Keep default model or find a Tamil-specific one
//         break;
//       default:
//         languageInstruction = "Respond ONLY in English.";
//     }

//     const systemMessage = `
// You are MamaBot, a pregnancy and maternal health assistant.

// ${languageInstruction}

// Allowed topics ONLY:
// - Pregnancy (all trimesters)
// - Prenatal care
// - Nutrition during pregnancy
// - Physical and emotional changes in pregnancy
// - Labor, delivery, and postpartum care
// - Newborn care (first months only)

// Disallowed topics:
// - Politics, religion, finance, programming, relationships unrelated to pregnancy
// - Mental health therapy outside pregnancy context
// - Any topic not directly related to pregnancy or maternal health

// Rules:
// - Stay strictly within allowed topics
// - Be calm, empathetic, and supportive
// - You are NOT a doctor
// - Do NOT provide diagnoses or prescriptions
// - If danger signs are mentioned (heavy bleeding, severe pain, fainting, fever, reduced baby movement),
//   advise seeking immediate medical care

// If the user asks about a disallowed topic:
// - Politely refuse
// - State you can only help with pregnancy-related topics
// - Invite them to ask a pregnancy-related question
// `;

//     // 🧠 PROMPT BUILDING
//     const prompt =
//       [systemMessage]
//         .concat(
//           messages.map((m) =>
//             m.role === "user"
//               ? `User: ${m.content}`
//               : `Assistant: ${m.content}`,
//           ),
//         )
//         .join("\n") + "\nAssistant:";

//     // 🚀 STREAMING RESPONSE with dynamic model
//     const stream = await replicate.stream(modelId, {
//       input: {
//         prompt,
//         temperature: 0.4,
//         max_new_tokens: 400,
//       },
//     });

//     for await (const event of stream) {
//       if (event.event === "output") {
//         res.write(
//           `data: ${JSON.stringify({
//             choices: [
//               {
//                 delta: { content: String(event.data ?? "") },
//               },
//             ],
//           })}\n\n`,
//         );
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.end();
//   }
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "ok",
//     message: "Server is running ✅",
//     timestamp: new Date(),
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

//======================================================= gemini ====================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// Preflight
app.options("/v1/chat/completions", (_, res) => res.sendStatus(204));

app.post("/v1/chat/completions", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { messages = [], language = "en" } = req.body;

    // 🌍 Language enforcement
    const languageInstructionMap = {
      en: "Respond ONLY in English.",
      si: "සිංහලෙන් පමණක් පිළිතුරු දෙන්න.",
      ta: "தமிழில் மட்டும் பதிலளிக்கவும்.",
    };

    //     const systemPrompt = `
    // You are MamaBot, a pregnancy and maternal health assistant.

    // ${languageInstructionMap[language] ?? languageInstructionMap.en}

    // Allowed topics only:

    // Pregnancy (all trimesters)

    // Prenatal care

    // Nutrition during pregnancy

    // Physical and emotional changes

    // Labor, delivery, postpartum care

    // Newborn care (first months only)

    // Guidelines for responses:

    // Be calm, empathetic, and supportive.

    // You are not a doctor; do not give diagnoses or prescriptions.

    // When a user mentions a symptom or concern:

    // Explain possible reasons in simple, understandable terms.

    // Use reassuring language while making it clear these are general possibilities, not a diagnosis.

    // Always suggest seeing a healthcare professional for confirmation or if symptoms persist.

    // Example: If a user says they haven’t gotten their period on time, you might explain it could be due to pregnancy, hormonal changes, stress, or other health factors, and recommend confirming with a doctor.

    // If danger signs are mentioned (heavy bleeding, severe pain, high fever, etc.), advise immediate medical care without delay.

    // Focus on providing education, reassurance, and guidance relevant to pregnancy, postpartum, and newborn care.
    // `;

    const systemPrompt = `
You are MamaBot, an AI-powered digital assistant designed to support expectant and new mothers through their pregnancy journey.

${languageInstructionMap[language] ?? languageInstructionMap.en}

---

## PRIMARY ROLE
You are strictly an informational and supportive tool — NOT a clinical or diagnostic system.

---

## CORE FUNCTIONAL SCOPE

### 1. Pregnancy Timeline Awareness
When a user provides their Last Menstrual Period (LMP) or Expected Due Date (EDD), calculate and reference:
- Current pregnancy week
- Estimated due date
- Trimester classification:
  - 1st Trimester: Weeks 1–12
  - 2nd Trimester: Weeks 13–27
  - 3rd Trimester: Weeks 28–40

Use this calculated stage to personalize all subsequent responses.

### 2. Stage-Based Guidance
Based on the user's pregnancy stage, provide relevant weekly guidance covering:
- Baby development milestones
- Physical changes in the mother
- Emotional and mental wellbeing
- Nutrition and lifestyle tips

Coverage scope: Conception → Full-term pregnancy → Postpartum → Early newborn care (first 3–6 months)

All content must be:
- Generalized and educational
- Non-diagnostic
- Supportive in tone

### 3. Newborn Care Support
Provide high-level informational guidance only on:
- Feeding basics
- Sleep patterns
- General infant care awareness

No medical or pediatric recommendations.

---

## SAFETY DETECTION — CRITICAL

If the user mentions ANY of the following signals — immediately stop normal guidance and escalate:
- Severe pain
- Bleeding or spotting
- Dizziness or fainting
- Difficulty breathing
- High fever
- Reduced or absent fetal movement
- Any emergency-related phrasing

When escalating, respond ONLY with a clear, calm message advising the user to seek immediate medical attention. Do NOT interpret the symptom, offer reassurance about it, or continue normal guidance.

---

## DEFINED LIMITATIONS

You MUST NOT:
- Provide medical diagnoses
- Prescribe treatments or medication
- Replace professional healthcare consultation
- Interpret symptoms clinically
- Offer emergency response handling

Always remind users that your guidance is informational only and that a qualified healthcare professional should be consulted for any medical concerns.
`;

    // // 🧠 Convert messages → Gemini format
    // const chatHistory = messages.map((m) => ({
    //   role: m.role === "user" ? "user" : "model",
    //   parts: [{ text: m.content }],
    // }));

    // 1️⃣ Keep ONLY user/assistant messages
    const filtered = messages.filter(
      (m) => m.role === "user" || m.role === "assistant",
    );

    // 2️⃣ Ensure first message is USER
    const safeHistory = filtered.slice(
      filtered.findIndex((m) => m.role === "user"),
    );

    // 3️⃣ Convert to Gemini format
    const chatHistory = safeHistory.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessageStream("");

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (!text) continue;

      res.write(
        `data: ${JSON.stringify({
          choices: [{ delta: { content: text } }],
        })}\n\n`,
      );
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

// Health check
app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    message: "Gemini server running ✅",
    timestamp: new Date(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Gemini server running on port ${PORT}`));

// whatsapp integration

// Webhook verification (one-time, required by Meta)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN; // you choose this string

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive incoming WhatsApp messages
app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // Always respond fast to Meta

  const body = req.body;
  if (body.object !== "whatsapp_business_account") return;

  const entry = body.entry?.[0]?.changes?.[0]?.value;
  const message = entry?.messages?.[0];

  if (!message || message.type !== "text") return;

  const from = message.from; // sender's WhatsApp number
  const text = message.text.body; // their message text

  await handleWhatsAppMessage(from, text);
});

// In-memory session store (use Redis in production)
const sessions = {};

async function handleWhatsAppMessage(from, text) {
  // Init session for new users
  if (!sessions[from]) {
    sessions[from] = { language: null, messages: [] };
    await sendWhatsAppMessage(
      from,
      "👶 *Hi, I'm MamaBot!*\n\nI'm here to help with pregnancy, prenatal care, postpartum care, and newborn health.\n\nReply with:\n1️⃣ for English\n2️⃣ for සිංහල\n3️⃣ for தமிழ்",
    );
    return;
  }

  const session = sessions[from];

  // Language selection
  if (!session.language) {
    const pick = text.trim();
    if (pick === "1") session.language = "en";
    else if (pick === "2") session.language = "si";
    else if (pick === "3") session.language = "ta";
    else {
      await sendWhatsAppMessage(
        from,
        "Please reply with 1, 2, or 3 to choose your language.",
      );
      return;
    }

    const confirmations = {
      en: "Great! I'll continue in *English* 💙",
      si: "හරි! මම *සිංහලෙන්* ඔබට උදව් කරන්නම් 💙",
      ta: "சரி! நான் *தமிழில்* உதவுகிறேன் 💙",
    };
    await sendWhatsAppMessage(from, confirmations[session.language]);
    return;
  }

  // Add user message to history
  session.messages.push({ role: "user", content: text });

  // Keep last 8 messages only
  if (session.messages.length > 8) {
    session.messages = session.messages.slice(-8);
  }

  // Call your existing Gemini logic
  const reply = await getGeminiReply(session.messages, session.language);

  // Add assistant reply to history
  session.messages.push({ role: "assistant", content: reply });

  await sendWhatsAppMessage(from, reply);
}

async function getGeminiReply(messages, language = "en") {
  const languageInstructionMap = {
    en: "Respond ONLY in English.",
    si: "සිංහලෙන් පමණක් පිළිතුරු දෙන්න.",
    ta: "தமிழில் மட்டும் பதிலளிக்கவும்.",
  };

  const systemPrompt = `You are MamaBot... ${languageInstructionMap[language]}`; // your existing prompt

  const filtered = messages.filter(
    (m) => m.role === "user" || m.role === "assistant",
  );
  const safeHistory = filtered.slice(
    filtered.findIndex((m) => m.role === "user"),
  );
  const chatHistory = safeHistory.slice(0, -1).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const lastUserMessage = safeHistory[safeHistory.length - 1].content;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
  });

  const result = await chat.sendMessage(lastUserMessage);
  return result.response.text();
}

async function sendWhatsAppMessage(to, text) {
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const TOKEN = process.env.WHATSAPP_TOKEN;

  await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  });
}
