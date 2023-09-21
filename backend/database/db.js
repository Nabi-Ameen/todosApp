import mysql from "mysql";
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "todos_data",
});

export default pool;
