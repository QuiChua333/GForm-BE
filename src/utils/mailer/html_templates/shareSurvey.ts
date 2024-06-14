interface Props {
  surveyTitle?: string;
  message?: string;
  linkEditSurvey: string;
  ownerName: string;
}

const shareSurvey = ({
  surveyTitle,
  message,
  linkEditSurvey,
  ownerName,
}: Props) => {
  return `
   <!Doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cuộc chia sẻ khảo sát</title>
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
          <h2>Cuộc chia sẻ khảo sát: ${surveyTitle}</h2>
          <p>${message}</p>
          <p>Nhấn vào nút bên dưới để tham gia vào cuộc khảo sát của ${ownerName}</p>
          <p style="text-align: center; margin-top: 30px">
            <a
              href="${linkEditSurvey}"
              style="
                cursor: pointer;
                display: inline-block;
                background-color: #fcc934;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
              "
              >Truy cập</a
            >
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

      `;
};

export default shareSurvey;
