const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { paymentMethod, amount, currency } = req.body;

  try {
    const paymentResponse = await axios.post('http://localhost:4000/api/payment/process', {
      paymentMethod,
      amount,
      currency
    });

    if (paymentResponse.data.hasError) {
      return res.status(400).json({ message: paymentResponse.data.message });
    }

    res.status(200).json({
      status: paymentResponse.data.status,
      transactionId: paymentResponse.data.transactionId,
      amount: paymentResponse.data.amount,
      currency: paymentResponse.data.currency
    });
  } 
  catch (error) {
    console.error('Erro ao processar pagamento: ', error);
    res.status(404).send({success: false, message: 'Erro ao processar pagamento: Moeda não disponónivel ou não suportada'});
  }
};
