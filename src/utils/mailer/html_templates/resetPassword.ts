const resetPassword = (link: string) => {
  return `
    <!Doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Xác minh Email</title>
      </head>
      <style>
        body {
          color: #5f6368;
          background-color: #f9f9f9;
        }
        .img {
          border-radius: 20px;
          width: 200px;
        }
      </style>
      <body style="font-family: Arial, sans-serif">
        <table
          style="
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-collapse: collapse;
          "
        >
          <tr>
            <td style="background-color: #ffffff; padding: 30px">
              <img src="https://i.ibb.co/CPZBhtp/GForm-logo.png" class="img" />
              <h2>Thay đổi mật khẩu</h2>
              <p>Nhấn vào nút bên dưới để đến trang thay đổi mật khẩu</p>
              <p style="text-align: center; margin-top: 30px">
                <a
                  href="${link}"
                  style="
                    cursor: pointer;
                    display: inline-block;
                    background-color: #fcc934;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                  >Thay đổi mật khẩu</a
                >
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  
      `;
};

export default resetPassword;
