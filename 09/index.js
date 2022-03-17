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
  connection.query(
    "SELECT * FROM todo WHERE deleted_at IS NULL",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("error");
        return;
      }
      console.log(results);
      res.json(results);
    }
  );
});

app.post("/todo", (req, res) => {
  console.log(req.body);
  const todo = {
    status: req.body.status,
    task: req.body.task,
  };
  connection.query("INSERT INTO todo SET ?", todo, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("error");
      return;
    }
    res.send("ok");
  });
});

app.put("/todo/:todoId", (req, res) => {
  console.log(req.params);
  const todoId = req.params.todoId;
  console.log(req.body);
  const todo = {
    status: req.body.status,
    task: req.body.task,
  };
  connection.query(
    "UPDATE todo SET status = ?, task = ? WHERE id = ? AND deleted_at IS NULL",
    [todo.status, todo.task, todoId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("error");
        return;
      }
      res.send("ok");
    }
  );
});

app.delete("/todo/:todoId", (req, res) => {
  console.log(req.params);
  const todoId = req.params.todoId;
  connection.query(
    "UPDATE todo SET deleted_at = ? WHERE id = ?",
    [new Date(), todoId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("error");
        return;
      }
      res.send("ok");
    }
  );
  // connection.query(
  //   "DELETE FROM todo WHERE id = ?",
  //   todoId,
  //   (error, results) => {
  //     if (error) {
  //       console.log(error);
  //       res.status(500).send("error");
  //       return;
  //     }
  //     res.send("ok");
  //   }
  // );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
