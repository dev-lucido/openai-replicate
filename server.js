import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const app = express();

app.use(cors());


app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.options("/v1/chat/completions", (req, res) => {
  res.sendStatus(204);
});

app.post("/v1/chat/completions", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const messages = req.body.messages || [];

    const systemMessage =
      "You are a helpful assistant. Always remember the conversation history.";

    // Build prompt for the model
    const prompt =
      [systemMessage]
        .concat(
          messages.map((m) =>
            m.role === "user"
              ? `User: ${m.content}`
              : `Assistant: ${m.content}`,
          ),
        )
        .join("\n") + "\nAssistant: ";

    // const prompt =
    //   messages.map((m) => `${m.role}: ${m.content}`).join("\n") + " assistant:";

    // ✅ THIS is the correct streaming API
    const stream = await replicate.stream("meta/meta-llama-3-8b-instruct", {
      input: {
        prompt,
        temperature: 0.7,
        max_new_tokens: 512,
      },
    });

    for await (const event of stream) {
      if (event.event === "output") {
        const token = String(event.data ?? "");

        res.write(
          `data: ${JSON.stringify({
            choices: [
              {
                delta: { content: token },
              },
            ],
          })}\n\n`,
        );
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running ✅",
    timestamp: new Date(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
