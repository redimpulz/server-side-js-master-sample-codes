const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

app.get("/hogehoge", (req, res) => {
  res.send("hogehoge!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd");
// });

// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });

// app.get("/ab*cd", (req, res) => {
//   res.send("ab*cd");
// });

// app.get("/ab(cd)?e", (req, res) => {
//   res.send("/ab(cd)?e");
// });

// app.get(/.*fly$/, (req, res) => {
//   res.send("/.*fly$/");
// });

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
