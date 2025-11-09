const express = require("express");
const app = express();
const PORT = 3000;
const tasksRouter = require("./routes");

app.use(express.json());
app.use("/", tasksRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
