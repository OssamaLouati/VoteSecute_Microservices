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
/*
exports.subscribe = () => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "VoteQueue";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, (msg) => {
        const email = msg.content.toString();
        console.log(`Received: ${msg.content.toString()}`);
        paymentController.AsyncCreateAccount(email);
        chanel.ack(msg);
      });
    });
  });
};*/

exports.subscribeVote = () => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "VoteQueue";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, (msg) => {
        console.log("Receive from the queue VoteQueue");
        const email = msg.content.toString();
        console.log(`email voter: ${msg.content.toString()}`);
        paymentController.AsyncPay(email);
        chanel.ack(msg);
      });
    });
  });
};
