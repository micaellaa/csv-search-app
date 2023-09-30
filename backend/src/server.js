import express from "express";
import cors from "cors";
import upload from "./routes/upload.js";

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/upload", upload);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
