import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
