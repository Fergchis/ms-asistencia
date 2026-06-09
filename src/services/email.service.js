const nodemailer = require('nodemailer');

const enviarCorreo = async ({ destinatario, asunto, mensaje }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: destinatario,
    subject: asunto,
    text: mensaje
  });
};

module.exports = {
  enviarCorreo
};