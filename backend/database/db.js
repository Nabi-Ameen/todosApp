import mysql from "mysql";
const pool = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "password",
  database: "todos_data",
});

export default pool;
