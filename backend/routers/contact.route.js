const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";


  db.query(sql, [name, email, message], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Message saved successfully!" });
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM contact_messages ORDER BY id DESC";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

module.exports = router;
