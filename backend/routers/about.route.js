const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql = `
    INSERT INTO about_messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, message], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Message saved successfully!" });
  });
});

module.exports = router;
