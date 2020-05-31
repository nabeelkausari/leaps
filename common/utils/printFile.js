export const printResult = component => {
  let win = window.open("", "_blank", "height=500, width=500");
  let userStepFlyoutContent = `
        <html>
        <head>
          <style>
           td, th {
            padding: .5rem 1rem;
           }
          </style>
        </head>
        <body>${component.current.innerHTML}</body>
        </html>
        `;
  win.document.write(userStepFlyoutContent);
  win.print();
  win.close();
};
