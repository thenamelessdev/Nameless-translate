const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
    res.sendFile(__dirname + "/public/404.html");
});

app.listen(80);