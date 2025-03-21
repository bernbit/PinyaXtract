export const getGeneratedHTML = (data: any) => {
  const rows = data
    .map(
      (item: any) => `
      <tr>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td><div class="weight">${item.weight}</div></td>
      </tr>
    `,
    )
    .join(""); // Convert array to a single string

  const startDate = data[0].date;
  const endDate = data[data.length - 1].date;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      :root {
        --main: #eef7ff;
        --dark-main: #4c6e71;
        /* --main: #FFF;  (If you want to switch the main color, uncomment this) */
        --primary: #30f353;
        --secondary: #2b2b2b;
        --background: #1f494d;
        --background-alt: #355c60;
        --light-text: #ffffff;
        --dark-text: #2b2b2b;
        --danger: #ff0000;
        --notification: #c1fbcb;
      }

      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html {
        font-family: "Roboto", sans-serif;
      }
      body {
        /* height: 100vh; */
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 10px 16px 10px;
        color: var(--dark-text);
        row-gap: 10px;
        font-weight: 500;
      }

      h4 {
        text-align: center;
      }

      table {
        width: 92%;
        border-collapse: collapse;
        /* border-spacing: 0; */
        text-align: center;
        border: 1px rgba(31, 73, 77) solid;
      }

      thead {
        background-color: var(--background);
        color: var(--light-text);
        border: none;
        outline: none;
        border-collapse: collapse;
      }

      th {
        padding: 8px;
        border: none;
        outline: none;
        border-collapse: collapse;
      }

      td {
        padding: 8px;
        border: 1px rgba(31, 73, 77, 0.5) solid;
      }

      td .weight {
        background-color: var(--primary);
        border-radius: 6px;
        padding: 1;
      }

      @page {
            margin: 15mm 5mm 15mm 5mm; /* Top, Right, Bottom, Left margins */
      }
    </style>
  </head>
  <body>
    <h4>Pinyaxtract Invertory Report - (${startDate} - ${endDate})</h4>

    <table>
      <thead>
        <th>Date</th>
        <th>Time</th>
        <th>Weight</th>
      </thead>

      <tbody>
        ${rows}
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
};
