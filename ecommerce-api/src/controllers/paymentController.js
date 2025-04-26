const axios = require('axios');
const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

redisClient.connect();

exports.processPayment = async (req, res) => {
  const { paymentMethod, amount, currency } = req.body;

  try {
    const cacheKey = `payment:${currency}:${amount}`;

    const cachedPayment = await redisClient.get(cacheKey);

    if (cachedPayment) {
      console.log('Retornando pagamento do cache!');
      return res.status(200).json(JSON.parse(cachedPayment));
    }

    const paymentResponse = await axios.post('http://localhost:4000/api/payment/process', {
      paymentMethod,
      amount,
      currency
    });

    if (paymentResponse.data.hasError) {
      return res.status(400).json({ message: paymentResponse.data.message });
    }

    const paymentData = {
      status: paymentResponse.data.status,
      transactionId: paymentResponse.data.transactionId,
      amount: paymentResponse.data.amount,
      currency: paymentResponse.data.currency
    };

    await redisClient.setEx(cacheKey, 300, JSON.stringify(paymentData));

    res.status(200).json(paymentData);
  } 
  catch (error) {
    console.error('Erro ao processar pagamento: ', error);
    res.status(404).send({ success: false, message: 'Erro ao processar pagamento: Moeda não disponível ou não suportada' });
  }
};
