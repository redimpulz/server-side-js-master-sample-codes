const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const mysql = require("mysql");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "db",
  // 本番環境では環境変数を使うようにする
  password: "example",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

app.get("/todo", (req, res) => {
  connection.query("SELECT * FROM todo", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("error");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
