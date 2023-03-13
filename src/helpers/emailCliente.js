import nodemailer from 'nodemailer';

export const emailRegistroCliente = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // informacion email

  const info = await transport.sendMail({
    from: '"Fudeco - Administrador" <cuentas@fudeco.com>',
    to: email,
    subject: 'Fudeco - Confirmar cuenta',
    text: 'Comprueba tu cuenta en Fudeco',
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en Fudeco</p>
        <p>Tu cuenta ya esta casi list, solo debes comprobarla en el siguente enlace:
        <a href="${process.env.FONTEND_URL}/confirmarCliente/${token}">Comprobar cuenta</a></p>

        <p>Si no creaste esta cuenta, por favor ignora este mensaje</p>
        
        
        `,
  });
};

export const emailOlvidePasswordCliente = async (datos) => {
  const { email, nombre, token } = datos;

  // TAREA: mover hacia variables de entorno

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // informacion email

  const info = await transport.sendMail({
    from: '"Fudeco - Administrador" <cuentas@fudeco.com>',
    to: email,
    subject: 'Fudeco - Reestablecer tu password',
    text: 'Restablece tu password',
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>
        <p>Sigue el siguente enlace para generar un nuevo password:
        <a href="${process.env.FONTEND_URL}/tienda/olvide-password/${token}">Reestablecer password</a></p>

        <p>Si no solicitaste este email, por favor ignora este mensaje</p>
        
        
        `,
  });
};
