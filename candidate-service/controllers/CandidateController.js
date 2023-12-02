const express = require("express");
const router = express.Router();
const candidate = require("../models/Candidate");
const Vote = require("../models/Vote");
const publish = require("./Async/publisher");
const subscribe = require("./Async/subscriber");
const amqp = require("amqplib/callback_api");

exports.getResults = async (req, res) => {
  try {
    const allCandidates = await candidate.find();
    console.log(allCandidates);

    // Use the Mongoose model to get distinct roles
    const roles = await candidate.distinct("role_being_candidated_for");

    let results = [];

    for (const role of roles) {
      // Filter the allCandidates array using JavaScript's filter method
      const candidatesForRole = allCandidates.filter(
        (c) => c.role_being_candidated_for === role
      );

      candidatesForRole.sort((a, b) => b.votes_number - a.votes_number);

      results.push({
        role: role,
        winner: candidatesForRole[0],
        candidates: candidatesForRole,
      });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Failed to fetch results:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

exports.sendVotes = async (req, res) => {
  try {
    const { email ,  votes } = req.body; // votes is an array of candidate IDs
    console.log(votes);
    const newVote = new Vote({
      email,
      votes,
      state: "Pending",
    });
    await newVote.save();
    await sendVoteMessage(email);
    const paymentStatus = await waitForPaymentStatus();
    if (paymentStatus === "Your Action has been done successfully") {
      console.log("good");
      await Vote.updateOne({ email: email }, { state: "Done" });
      for (const candidateId of votes) {
        await candidateId.findByIdAndUpdate(candidateId, {
          $inc: { votes_number: 1 },
        });
      }
    } else {
      await Vote.updateOne({ email: email }, { state: "Failed" });
      setTimeout(async () => {
        await Vote.deleteOne({ email: email });
      }, 6000);
      throw new Error(paymentStatus);
    }

    /*
    let queueName = "VoteQueue-Response";
    chanel.sendToQueue("VoteQueue", Buffer.from(message));
    await chanel.consume(queueName, async (msg) => {
      console.log("Receive from the queue VoteQueue-Response");
      const message = msg.content.toString();
      console.log(`ReceivedPaymentResponse: ${msg.content.toString()}`);
      if (message === "Your Action has been done successfully") {
        await Vote.updateOne({ email: email }, { state: Done });
      } else {
        await Vote.updateOne({ email: email }, { state: Failed });
        setTimeout(async () => {
          await Vote.deleteOne({ email: email });
        }, 600000);
        throw new Error(message);
      }
    });
    
    
    sub(async (err, message) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Received message:", message);
        if (message === "Your Action has been done successfully") {
          await Vote.updateOne({ email: email }, { state: Done });
        } else {
          await Vote.updateOne({ email: email }, { state: Failed });
          setTimeout(async () => {
            await Vote.deleteOne({ email: email });
          }, 60000);
          throw new Error(message);
        }
      }
    });*/

    // For each candidate ID, increment the votes_number by 1
    /*for (const candidateId of votes) {
      await candidateId.findByIdAndUpdate(candidateId, {
        $inc: { votes_number: 1 },
      });
    }*/

    res.send({ message: "Votes submitted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const sendVoteMessage = (email) => {
  return new Promise((resolve, reject) => {
    amqp.connect("amqp://localhost", (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.createChannel((err, chanel) => {
        if (err) {
          reject(err);
          return;
        }

        let queueName = "VoteQueue";
        let message = email;
        chanel.assertQueue(queueName, { durable: false });
        chanel.sendToQueue(queueName, Buffer.from(message));
        console.log("vote user : " + message);

        setTimeout(() => {
          connection.close();
          resolve(); // Résoudre la promesse après l'envoi du message
        }, 1000);
      });
    });
  });
};

const waitForPaymentStatus = () => {
  return new Promise((resolve, reject) => {
    amqp.connect("amqp://localhost", (err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.createChannel((err, chanel) => {
        if (err) {
          reject(err);
          return;
        }

        const paymentQueue = "VoteQueue-Response";

        chanel.assertQueue(paymentQueue, { durable: false });

        chanel.consume(paymentQueue, (msg) => {
          const paymentStatus = msg.content.toString();
          console.log("Received payment status:", paymentStatus);

          // Acknowledge the payment status message
          chanel.ack(msg);

          // Fermer la connexion après avoir reçu le statut de paiement
          setTimeout(() => {
            resolve(paymentStatus); // Résoudre la promesse avec le statut de paiement
            connection.close();
          }, 1000);
        });
      });
    });
  });
};

exports.changevotestate = async (msg) => {
  try {
    let message = msg;
    if (message === "Your Action has been done successfully") {
      await Vote.updateOne({ email: email }, { state: Done });
    } else {
      await Vote.updateOne({ email: email }, { state: Failed });
      setTimeout(async () => {
        await Vote.deleteOne({ email: email });
      }, 600000);
      throw new Error(message);
    }
  } catch (error) {
    throw new Error("server Error");
  }
};

exports.getVoteBoard = async (req, res) => {
  try {
    const candidates = await candidates.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
