const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/generate', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.sendFile(__dirname + '/index.html');
  }

  QRCode.toDataURL(url, (err, src) => {
    if (err) res.send('Error occurred');

    res.send(`
      <h1>QR Code Generator</h1>
      <form action="/generate" method="post">
        <input type="text" name="url" placeholder="Enter URL" required>
        <button type="submit">Generate</button>
      </form>
      <br>
      <img src="${src}" alt="QR Code">
      <br>
      <a href="${src}" download="qrcode.png">Download QR Code</a>
    `);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
