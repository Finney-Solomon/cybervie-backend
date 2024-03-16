const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET =  process.env.CLIENT_SECRET;
const REDIRECT_URI =  process.env.REDIRECT_URI;
const REFRESH_TOKEN =  process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail( data) {
  const name=data?.name
  const sendMailTo= data?.email
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'dev.cybervie@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'CYBERVIE DEV <dev.cybervie@gmail.com>',
      to: sendMailTo,
      subject: 'Explore Our Cybersecurity Training Program',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Explore Our Cybersecurity Training Program</title>
      </head>
      <body>
      <p>Hi  ${name},</p>
      <p>I noticed your interest in cybersecurity, and I wanted to introduce you to our training program at Cybervie.</p>
      <ul>
        <li>Comprehensive curriculum</li>
        <li>Expert guidance</li>
        <li>Hands-on experience</li>
        <li>Certification</li>
      </ul>
      <p>In addition to our training program, here are some key points about Cybervie:</p>
      <ul>
        <li>Redefining Cybersecurity as a Service</li>
        <li>360-degree Managed Security Services</li>
        <li>SOC L1 and L2 support for maximum efficiency</li>
        <li>Regular vulnerability scan and threat detection</li>
        <li>24/7 Expert Consultation and In-depth Analysis</li>
      </ul>
      <p>If you're interested in learning more about our cybersecurity training program or exploring our website, you can visit <a href="https://www.cybervie.com/">Cybervie</a>.</p>
      <p>Let's chat and discuss how Cybervie can help you achieve your cybersecurity goals!</p>
      <p>Best regards,<br>
      CYBERVIE DEV</p>
      </body>
      </html>
      
    `
    };

    const result = await transport.sendMail(mailOptions);
     return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendMail
};
