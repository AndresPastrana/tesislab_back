export const htmlTemplateCred = (username: string, password: string) => {
  const emailHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      /* Add your inline CSS styles here */
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #3498db;
      }
      .password-info {
        margin-bottom: 20px;
      }
      .conditional-message {
        color: #e74c3c;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hello User!</h1>
      <div class="password-info">
      <p>Your username is: ${username}</p>
        <p>Your password is: ${password}</p>
        <p>Thank you for using our service.</p>
      </div>
      <p class="conditional-message">If you did not request these credentials, please ignore this message.</p>
    </div>
  </body>
  </html>
`;

  return emailHTML;
};

export const generarMensajeCambioEmail = (
  nombreUsuario: string,
  nuevoEmail: string,
  nuevaContraseña: string
) => {
  return `
    <div style="font-family: 'Arial', sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333; text-align: center;">Cambio de Email de la Cuenta</h2>
      <p style="color: #555; line-height: 1.6; text-align: justify;">
        Hola ${nombreUsuario},
      </p>
      <p style="color: #555; line-height: 1.6; text-align: justify;">
        Queremos informarte que el email de tu cuenta ha sido cambiado exitosamente.
        Tu nuevo email es: <strong>${nuevoEmail}</strong>.
      </p>
      <p style="color: #555; line-height: 1.6; text-align: justify;">
        Además, se han asignado nuevas credenciales a tu cuenta:
      </p>
      <p style="color: #555; line-height: 1.6; text-align: justify;">
        <strong>Nombre de Usuario:</strong> ${nombreUsuario}<br />
        <strong>Contraseña:</strong> ${nuevaContraseña}
      </p>
      <p style="color: #555; line-height: 1.6; text-align: justify;">
        Por favor, mantén esta información segura. Si no solicitaste este cambio,
        por favor contacta a nuestro equipo de soporte de inmediato.
      </p>
      <p style="color: #555; line-height: 1.6; text-align: center; margin-top: 20px;">
        ¡Gracias por usar nuestros servicios!
      </p>
    </div>
  `;
};
