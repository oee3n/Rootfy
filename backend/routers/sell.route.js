const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM plants_for_sale ORDER BY id DESC";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { plantName, price, city, careLevel, description } = req.body;

  const sql = `
    INSERT INTO plants_for_sale (plant_name, price, city, care_level, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [plantName, price, city, careLevel, description], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Plant added successfully!" });
  });
});

module.exports = router;
