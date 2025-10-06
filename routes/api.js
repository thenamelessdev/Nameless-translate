const express = require("express");
require("dotenv").config();
const router = express.Router();
const deeplApi = process.env.deepl;

router.get("/translate", async (req, res) => {
    const targLang = req.query.targetLang;
    const translateText = req.query.text;
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
    const translatedText = await responseJson.translations[0].text;
    await res.json({ "translatedText": translatedText });
})

module.exports = router;