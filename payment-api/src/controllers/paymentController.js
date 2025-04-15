const paymentService = require('../services/mockPaymentService');

exports.processPayment = async (req, res) => {
  const { paymentMethod, amount, currency } = req.body;

  try {
    const paymentResult = await paymentService.processPayment({ amount, currency });
    
    res.status(200).json({
      transactionId: paymentResult.transactionId,
      amount: paymentResult.amount,
      currency: paymentResult.currency
    });
  } catch (error) {
    res.status(500).send('Error processing payment');
  }
};
