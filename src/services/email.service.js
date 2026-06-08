const nodemailer = require('nodemailer');

// Usamos Ethereal Email para pruebas seguras en desarrollo
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        // Credenciales actualizadas dinámicamente
        user: 'fycouufk5j7vkt6s@ethereal.email',
        pass: 'JPWQnr9cgb7BxQkH3t'
    }
});

// exportamos para enviar los correos
const enviarCorreo = async (destinatario, asunto, texto) => {
    try {
        const info = await transporter.sendMail({
            from: '"Colegio Bernardo O Higgins" <institucion@aulabo.com>', // Remitente
            to: destinatario, // A quién va dirigido
            subject: asunto, // Asunto del correo
            text: texto // Cuerpo del mensaje
        });

        console.log("Correo enviado con éxito. ID:", info.messageId);

        // genera un enlace para ver el correo renderizado en el navegador
        console.log("Previsualiza tu correo aquí:", nodemailer.getTestMessageUrl(info));

        return true;
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return false;
    }
};

module.exports = {
    enviarCorreo
};
