const amqp = require("amqplib/callback_api");

exports.publish = (email) => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "PaymentVote";
      let message = email;
      chanel.assertQueue(queueName, { durable: false });
      chanel.sendToQueue(queueName, Buffer.from(message));
      console.log("vote user : " + message);
      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  });
};
