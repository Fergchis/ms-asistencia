const nodemailer = require('nodemailer');

// Usamos Gmail para envío de correos reales
const enviarCorreo = async ({ destinatario, asunto, mensaje }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // exportamos para enviar los correos
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