const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/payment', (req, res) => {
  // Simulate payment processing
  const paymentData = req.body;
  // Perform any necessary validation or processing
  // ...

  // Simulate successful payment
  res.send('Payment successful!');
});

app.listen(3000, () => {
  console.log('Dummy payment gateway running on port 3000');
});