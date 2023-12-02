const amqp = require("amqplib/callback_api");
const subscribe=require("../Async/subscriber")

exports.publish = async (email) => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }
    console.log("createChannel with the queue VoteQueue");
    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "VoteQueue";
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
