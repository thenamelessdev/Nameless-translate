const express = require("express");
require("dotenv").config;
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.listen(80);