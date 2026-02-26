import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;

import logs from "./routes/logs.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/logs", logs);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
