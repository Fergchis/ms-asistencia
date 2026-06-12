const nodemailer = require('nodemailer');
const dns = require('dns').promises;

const resolverHostSmtp = async () => {
  const smtpHost = process.env.SMTP_HOST;

  try {
    const direccionesIpv4 = await dns.resolve4(smtpHost);
    const hostIpv4 = direccionesIpv4[0];

    console.log('SMTP IPv4 resuelto:', {
      smtpHost,
      hostIpv4
    });

    return hostIpv4;
  } catch (error) {
    console.error('Error resolviendo IPv4 SMTP:', {
      host: smtpHost,
      message: error.message
    });

    return smtpHost;
  }
};

const enviarCorreo = async ({ destinatario, asunto, mensaje }) => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpHostConexion = await resolverHostSmtp();

  const transporter = nodemailer.createTransport({
    host: smtpHostConexion,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: {
      servername: smtpHost
    },
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