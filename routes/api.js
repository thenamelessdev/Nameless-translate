const express = require("express");
require("dotenv").config();
const router = express.Router();
const deeplApi = process.env.deepl;

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
        }
        catch {
            await res.json({ "error": "There was a error while translating" });
        }
    }
    else {
        res.json({ "error": "missing parameters" });
    }
})

module.exports = router;