import express from "express";
import { callGemini } from "../services/gemini.js";

const router = express.Router();

router.post("/pet-ai", async (req, res) => {
  const { petType, ageGroup, question } = req.body;

  if (!question || !petType || !ageGroup) {
    return res.status(400).json({ error: "Pet type, age group, and question are all required" });
  }

  const prompt = `
You are a helpful pet health assistant.
Answer ONLY dog and cat health questions.
Do NOT prescribe medicines or dosage.
Explain in simple, complete sentences.
Give detailed advice with steps if necessary.
Make sure the answer is fully complete and does not cut off.

Pet Type: ${petType}
Age Group: ${ageGroup}
User Question: ${question}
`;


  try {
    const reply = await callGemini(prompt);

    if (!reply) {
      return res.status(502).json({ error: "No response from Gemini API" });
    }

    res.json({ answer: reply });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: "Gemini failed to respond",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
