const { Resend } = require("resend");
const resendKey = process.env.resendKey;
const resend = new Resend(resendKey);

async function sendEmail(to, message) {
    try{
        const email = await resend.emails.send({
            from: "nameless-translate@support.thenamelessdev.com",
            to: to,
            subject: "Nameless translate | support",
            text: message
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = sendEmail;