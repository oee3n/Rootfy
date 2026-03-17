const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

const sellRoute = require("./routers/sell.route");
const contactRoute = require("./routers/contact.route");
const aboutRoute = require("./routers/about.route");
const cartRoute = require("./routers/cart.route");
const checkoutRoute = require("./routers/checkout.route");


app.use("/api/sell", sellRoute);
app.use("/api/contact", contactRoute);
app.use("/api/about", aboutRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);

app.listen(3000);
