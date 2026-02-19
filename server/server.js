import express from "express";
import cors from "cors";
const port = process.env.PORT || 8080;

import logs from "./routes/logs.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/logs", logs);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
