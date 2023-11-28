const amqp = require("amqplib/callback_api");
const paymentController = require("../PaymentController");
const publishvote = require("./publisher");
exports.subscribe = () => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "PaymentAccount";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, (msg) => {
        const email = msg.content.toString();
        console.log(`Received: ${msg.content.toString()}`);
        paymentController.AsyncCreateAccount(email);
        chanel.ack(msg);
      });
    });
  });
};

exports.subscribeVote = () => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "PaymentVote";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, async (msg) => {
        const email = msg.content.toString();
        console.log(`email voter: ${msg.content.toString()}`);
        chanel.ack(msg);
        const response = await paymentController.AsyncPay(email);
        publishvote.publishvote(response);
      });
    });
  });
};
