const amqp = require("amqplib/callback_api");

exports.publishvote = (msg) => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }
    console.log("createChannel with the queue VoteQueue-Response")
    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "VoteQueue-Response";
      let message = msg;
      chanel.assertQueue(queueName, { durable: false });
      chanel.sendToQueue(queueName, Buffer.from(message));
      console.log("PaymentResponse : " + message);
      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  });
};