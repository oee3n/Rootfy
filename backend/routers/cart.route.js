const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const cartItems = req.body;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid cart format" });
  }

  const sql = `
    INSERT INTO saved_carts (cart_json)
    VALUES (?)
  `;

  db.query(sql, [JSON.stringify(cartItems)], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cart saved successfully!" });
  });
});

module.exports = router;
