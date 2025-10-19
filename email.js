const { Resend } = require("resend");
require("dotenv").config();
const resendKey = process.env.resendKey;
const resend = new Resend(resendKey);

async function sendEmail(to, message, subject) {
    try{
        const email = await resend.emails.send({
            from: "nameless-translate@support.thenamelessdev.com",
            to: to,
            subject: subject,
            text: message
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = sendEmail;