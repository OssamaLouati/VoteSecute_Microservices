const amqp = require("amqplib/callback_api");
const candidatecontroller=require("../CandidateController")

exports.subscribe = async () => {
  amqp.connect(`amqp://localhost`, (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((err, chanel) => {
      if (err) {
        throw err;
      }
      let queueName = "VoteQueue-Response";
      chanel.assertQueue(queueName, { durable: false });
      chanel.consume(queueName, async (msg) => {
        console.log("Receive from the queue VoteQueue-Response");
        const Message = msg.content.toString();
        console.log(`ReceivedPaymentResponse: ${msg.content.toString()}`);
        candidatecontroller.changevotestate(Message);
        chanel.ack(msg);
      });
      
    });
  });
};
