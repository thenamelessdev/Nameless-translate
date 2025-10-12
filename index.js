const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
    res.render("404");
})

app.listen(80);