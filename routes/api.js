const express = require("express");
require("dotenv").config();
const router = express.Router();
const deeplApi = process.env.deepl;
const logHook = process.env.dcWebhook;

router.get("/translate", async (req, res) => {
    const targLang = req.query.targetLang;
    const translateText = req.query.text;
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
            const translation = "Translation: " + "target lang: " + targLang + " text: " + translateText;
            await fetch(logHook, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: translation
                })
            });
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

module.exports = router;