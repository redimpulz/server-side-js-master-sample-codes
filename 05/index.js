const express = require("express");
const app = express();
const port = 3000;

const interests = [
  {
    name: "programming",
    emoji: "💻",
    score: 80,
  },
  {
    name: "motorcycle",
    emoji: "🏍",
    score: 45,
  },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json(interests);
  // res.send(JSON.stringify(interests));
  // res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
