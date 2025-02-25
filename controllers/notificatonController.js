// const producer = require('../services/kafkaProducer');
require('dotenv').config();
const AWS = require('aws-sdk');

// Configure AWS SDK v2
AWS.config.update({
  region: 'eu-north-1',
  accessKeyId: 'AKIA34AMC2BBCV77MF6Q',
  secretAccessKey: "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",
});
const sns = new AWS.SNS();

const getHello = (req, res) => {
  console.log('Hello from notification controller');
  res.status(200).send('Hello from notification controller');
}

const healthCheck = (req, res) => {
  console.log('Hello from notification controller');
  res.status(200).send('Health check passed');
}

const getNotificationData = async (req, res) => {
  const notificationData = req.body;
  // const topic = "myPortfolioTopic";
  console.log('Notification Data:', notificationData);
  try {
    // await producer.sendMessage(topic, JSON.stringify(notificationData));
          // Send message to SNS
          const params = {
            Message: `
              Hi,
    
            `,
            Subject: "Work/Job Request : My Portfolio",
            TopicArn: "arn:aws:sns:eu-north-1:816069136450:myPortfolioNotification",
          };
          const data = await sns.publish(params).promise();
          res.status(200).send(`Message sent to SNS: ${data.MessageId}`);
          // console.log(`Message sent to SNS: ${data.MessageId}`);
  } catch (error) {
    // console.error('Error producing message in Kafka:', error);
    res.status(500).send('Error producing message in SNS', error);
    console.error('Error sending message to SNS:', error);
  }
};

module.exports = { getNotificationData, getHello, healthCheck };