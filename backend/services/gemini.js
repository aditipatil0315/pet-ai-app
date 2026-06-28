import axios from "axios";

export async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY || "TEST_KEY";

  // Return dummy response if API key is missing (for testing)
  if (apiKey === "TEST_KEY") {
    return `This is a test response. You asked: "${prompt}"`;
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        model: "gemini-2.5-flash", // Replace with your model if different
        messages: [
          {
            role: "system",
            content: `You are a helpful pet health assistant.
Answer ONLY dog and cat health questions.
Do NOT prescribe medicines or dosage.
Explain in simple, complete sentences.
Give detailed advice with steps if necessary.
Make sure the answer is fully complete and does not cut off.`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,   // Adjust for creativity/detail
        max_tokens: 1000,    // Increase to get full responses
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // OpenAI-compatible response
    return response.data?.choices?.[0]?.message?.content || null;

  } catch (error) {
    console.error("Error calling Gemini:", error.response?.data || error.message);
    throw error;
  }
}
