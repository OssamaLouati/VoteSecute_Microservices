const amqp = require("amqplib/callback_api");

exports.subscribe = (callback) => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "PaymentVote1";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, (msg) => {
        const Message = msg.content.toString();
        console.log(`ReceivedPaymentResponse: ${msg.content.toString()}`);
        chanel.ack(msg);
        setTimeout(() => {
          connection.close();
        }, 1000);
        callback(null, Message);
      });
    });
  });
};
