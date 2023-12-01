export var htmlTemplateCred = function(username, password) {
    var emailHTML = '\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Email Template</title>\n    <style>\n      /* Add your inline CSS styles here */\n      body {\n        font-family: \'Arial\', sans-serif;\n        line-height: 1.6;\n        color: #333;\n        background-color: #f4f4f4;\n        margin: 0;\n        padding: 0;\n      }\n      .container {\n        max-width: 600px;\n        margin: 0 auto;\n        padding: 20px;\n        background-color: #fff;\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n      }\n      h1 {\n        color: #3498db;\n      }\n      .password-info {\n        margin-bottom: 20px;\n      }\n      .conditional-message {\n        color: #e74c3c;\n        font-style: italic;\n      }\n    </style>\n  </head>\n  <body>\n    <div class="container">\n      <h1>Hello User!</h1>\n      <div class="password-info">\n      <p>Your username is: '.concat(username, "</p>\n        <p>Your password is: ").concat(password, '</p>\n        <p>Thank you for using our service.</p>\n      </div>\n      <p class="conditional-message">If you did not request these credentials, please ignore this message.</p>\n    </div>\n  </body>\n  </html>\n');
    return emailHTML;
};
export var generarMensajeCambioEmail = function(nombreUsuario, nuevoEmail, nuevaContraseña) {
    return '\n    <div style="font-family: \'Arial\', sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">\n      <h2 style="color: #333; text-align: center;">Cambio de Email de la Cuenta</h2>\n      <p style="color: #555; line-height: 1.6; text-align: justify;">\n        Hola '.concat(nombreUsuario, ',\n      </p>\n      <p style="color: #555; line-height: 1.6; text-align: justify;">\n        Queremos informarte que el email de tu cuenta ha sido cambiado exitosamente.\n        Tu nuevo email es: <strong>').concat(nuevoEmail, '</strong>.\n      </p>\n      <p style="color: #555; line-height: 1.6; text-align: justify;">\n        Adem\xe1s, se han asignado nuevas credenciales a tu cuenta:\n      </p>\n      <p style="color: #555; line-height: 1.6; text-align: justify;">\n        <strong>Nombre de Usuario:</strong> ').concat(nombreUsuario, "<br />\n        <strong>Contrase\xf1a:</strong> ").concat(nuevaContraseña, '\n      </p>\n      <p style="color: #555; line-height: 1.6; text-align: justify;">\n        Por favor, mant\xe9n esta informaci\xf3n segura. Si no solicitaste este cambio,\n        por favor contacta a nuestro equipo de soporte de inmediato.\n      </p>\n      <p style="color: #555; line-height: 1.6; text-align: center; margin-top: 20px;">\n        \xa1Gracias por usar nuestros servicios!\n      </p>\n    </div>\n  ');
};
