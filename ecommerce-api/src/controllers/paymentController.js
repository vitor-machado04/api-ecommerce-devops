const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { paymentMethod, amount, currency } = req.body;

  try {
    const paymentResponse = await axios.post('http://payment-api:4000/api/payment/process', {
      paymentMethod,
      amount,
      currency
    });

    res.status(200).json({
      status: 'Payment processed successfully',
      transactionId: paymentResponse.data.transactionId,
      amount: paymentResponse.data.amount,
      currency: paymentResponse.data.currency
    });
  } catch (error) {
    res.status(500).send('Payment processing failed');
  }
};
