const express = require("express");
const app = express();

app.set("trust proxy", true);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.get("/pp", (req, res) => {
    res.sendFile(__dirname + "/public/privacy policy.html");
});

app.get("/tos", (req, res) => {
    res.sendFile(__dirname + "/public/tos.html");
});

app.use((req, res) => {
    res.sendFile(__dirname + "/public/404.html");
});

app.listen(80);