const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rootfy",
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;
