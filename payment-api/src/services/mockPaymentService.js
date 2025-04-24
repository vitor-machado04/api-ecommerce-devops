exports.processPayment = async (paymentData) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          transactionId: Math.floor(Math.random() * 1000000).toString(),
          amount: paymentData.amount,
          currency: paymentData.currency
        });
      }, 1000);
    });
  };
  