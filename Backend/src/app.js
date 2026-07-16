const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

//We are testing route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to RevealQR API 🚀"
    });
});

module.exports = app;