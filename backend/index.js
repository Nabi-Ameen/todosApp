import express from "express";
import bodyParser from "body-parser";
import pool from "./database/db.js";
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from user", (err, data) => {
      connection.release();
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
