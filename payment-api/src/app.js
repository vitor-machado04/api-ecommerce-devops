const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const port = 4000;

app.use(express.json());
app.use('/api/payment', paymentRoutes);

app.listen(port, () => {
  console.log(`Payment API running on port ${port}`);
});
