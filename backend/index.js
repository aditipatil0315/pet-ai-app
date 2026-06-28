import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // MUST be at the top

console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);
// console.log("GEMINI KEY VALUE:", process.env.GEMINI_API_KEY || "TEST_KEY");

import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
