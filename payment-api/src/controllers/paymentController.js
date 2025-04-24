const axios = require('axios');
const mysql = require('mysql2');
const paymentService = require('../services/mockPaymentService');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Ecommerce'
});

exports.processPayment = async (req, res) => {
  const { paymentMethod, amount, currency } = req.body;

  try {
    const response = await axios.get(`http://localhost:5000/currency/verify?currency=${currency}`);

    if (!response?.data?.avaiable) {
      return res.status(400).json({ message: response.data.message, hasError: true });
    }

    const paymentResult = await paymentService.processPayment({ amount, currency });

    const query = 'INSERT INTO payments (status, transactionId, amount, currency) VALUES (?, ?, ?, ?)';
    db.execute(query, [paymentResult.status, paymentResult.transactionId, paymentResult.amount, paymentResult.currency], (err, results) => {
      if (err) {
        console.error('Erro ao persistir pagamento no banco: ', err);
        return res.status(500).json({ message: 'Erro ao persistir pagamento do banco', hasError: true });
      }

      res.status(200).json({
        status: paymentResult.status,
        transactionId: paymentResult.transactionId,
        amount: paymentResult.amount,
        currency: paymentResult.currency
      });
    });

  } 
  catch (error) {
    console.error('Erro ao processar pagamento: ', error);
    res.status(500).send('Erro ao processar pagamento');
  }
};
