import express from "express";
import bodyParser from "body-parser";
import pool from "./database/db.js";
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get all users
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

// get users by id
app.get("/users:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * from user where id = ? ",
      [req.params.id],
      (err, data) => {
        connection.release();
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      }
    );
  });
});

// delete records
app.delete("/users:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "DELETE from user where id = ? ",
      [req.params.id],
      (err, data) => {
        connection.release();
        if (err) {
          console.log(err);
        } else {
          res.json(`user id ${[req.params.id]} succesfully deleted `);
        }
      }
    );
  });
});

// add record
app.post("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const params = req.body;

    connection.query("INSERT INTO user SET ? ", params, (err, data) => {
      connection.release();
      if (err) {
        console.log(err);
      } else {
        res.json(`user id ${params.id} succesfully created `);
      }
    });
  });
});

// update user

app.put("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const { id, name, address, phone } = req.body;

    connection.query(
      "UPDATE user SET name = ? WHERE id = ?",
      [id, name],
      (err, data) => {
        connection.release();
        if (err) {
          console.log(err);
        } else {
          res.json(`user ${id} succesfully updated `);
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
