import express from "express";
import cors from "cors";

import diagnoseRouter from "./routes/diagnosis";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("Ping!");
  res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
