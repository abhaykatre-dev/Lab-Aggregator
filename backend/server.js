require("dotenv").config();
const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRouter);

app.get("/", (req, res) => {
  res.json({ message: "Lab Aggregator API running." });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Lab Aggregator Backend running on http://localhost:${PORT}`);
});
