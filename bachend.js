const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let orders = [];

// CREATE ORDER
app.post("/create-order", (req, res) => {

const order = req.body;

order.id = Date.now();
order.status = "NEW";

orders.push(order);

console.log("NEW ORDER:", order);

res.json({
success: true,
orderId: order.id
});
});

// GET ORDERS (for staff)
app.get("/orders", (req, res) => {
res.json(orders);
});

app.listen(3000, () => {
console.log("BOB HOTEL SERVER RUNNING ON PORT 3000");
});
