const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, phone, address, cart } = req.body;

  if (!name || !phone || !address || !cart) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const sql = `
    INSERT INTO orders (customer_name, phone, address, cart_json)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, address, JSON.stringify(cart)], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Order saved successfully!" });
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

