import express from "express";
const port = process.env.PORT || 8080;

import logs from "./routes/logs.js";

const app = express();

app.use(express.json());

app.use("/api/logs", logs);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
