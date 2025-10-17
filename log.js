const dbConn = require("./db");

async function logTranslate(targetLang, text, ip) {
    try{
        await dbConn.query("INSERT INTO `logs`(`targetLang`, `text`, `ip`) VALUES ('?','?','?')", [targetLang, text, ip]);
        return;
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports = logTranslate;