exports.processPayment = async (paymentData) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          transactionId: '151519165158',
          amount: paymentData.amount,
          currency: paymentData.currency
        });
      }, 1000);
    });
  };
  