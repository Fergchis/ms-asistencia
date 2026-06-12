const nodemailer = require('nodemailer');

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

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: destinatario,
      subject: asunto,
      text: mensaje
    });

    console.log('Correo enviado:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });

    return true;
  } catch (error) {
    console.error('Error SMTP al enviar correo:', {
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
      message: error.message,
      destinatario
    });

    throw error;
  }
};

module.exports = {
  enviarCorreo
};