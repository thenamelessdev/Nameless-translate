const express = require("express");
require("dotenv").config();
const logTranslate = require("../log");
const conf = require("../config.json");
const router = express.Router();
const deeplApi = process.env.deepl;

router.post("/translate", async (req, res) => {
    const { targLang, translateText } = req.body;
    if (targLang && translateText) {
        const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "DeepL-Auth-Key " + deeplApi
        },
        body: JSON.stringify({
            text: [translateText],
            target_lang: targLang
        })
        })
        const responseJson = await response.json()
        try {
            const translatedText = await responseJson.translations[0].text;
            await res.json({ "translatedText": translatedText });
            const ip = req.ip;
            await logTranslate(targLang, translateText, ip);
        }
        catch {
            await res.json({ "error": "There was a error while translating" });
        }
    }
    else {
        res.json({ "error": "missing parameters" });
    }
})

router.get("/meow", (req, res) => {
    res.json({ "meow": ["meow", "meow"] });
})

router.get("/version", (req, res) => {
    res.json({ "version": conf.version, "changelog": conf.changelog });
});


router.use((req, res) => {
    res.status(404).json({ "error": "404 not found" });
});

module.exports = router;