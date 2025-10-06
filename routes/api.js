const express = require("express");
require("dotenv").config();
const router = express.Router();
const deeplApi = process.env.deepl;

router.get("/translate", async (req, res) => {
    const targLang = req.query.targerLang;
    const text = req.query.text;
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: [text],
            target_lang: targLang
        })
    })
    const responseJson = await response.json()
    const translatedText = await responseJson.translations[0].text;
    await res.json({ "translatedText": translatedText });
})

module.exports = router;