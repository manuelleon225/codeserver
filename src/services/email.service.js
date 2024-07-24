import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codeservernazamanu@gmail.com',
        pass: 'iwpd uvlx twai xmdc',
    },
});

export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: 'codeservernazamanu@gmail.com',
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Tu código de verificación es: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};
