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
      <p>Your password is: ${username}</p>
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
