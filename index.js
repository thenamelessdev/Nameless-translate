const express = require("express");
const sendEmail = require("./email");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.get("/pp", (req, res) => {
    res.sendFile(__dirname + "/public/legal/privacy policy.html");
});

app.get("/tos", (req, res) => {
    res.sendFile(__dirname + "/public/legal/tos.html");
});

app.get("/changelog", (req, res) => {
    res.sendFile(__dirname + "/public/changelog.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/public/contact.html");
});

app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/public/errors/404.html");
});

if (!process.env.VERCEL) {
    app.listen(8080);
};
module.exports = app;