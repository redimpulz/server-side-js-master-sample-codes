const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// ミドルウェア関数 myLogger
const myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

// ミドルウェア関数 requestTime
const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// 設定可能なミドルウェア関数 myLogger
const myCustomLogger = (options) => (req, res, next) => {
  if (options) {
    console.log(`LOGGED ${options}`);
  } else {
    console.log("LOGGED");
  }
  next();
};

app.get("/", (req, res) => {
  console.log(req.requestTime);
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
