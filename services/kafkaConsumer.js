require('dotenv').config();
const kafka = require('../config/kafka');
const AWS = require('aws-sdk');
const consumer = kafka.consumer({ groupId: 'my-portfolio-group' });

// Configure AWS SDK v2
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const sns = new AWS.SNS();

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'myPortfolioTopics'});

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageContent = message.value.toString();
      console.log('From Kafka:', {
        partition,
        offset: message.offset,
        value: messageContent,
      });

      // Send message to SNS
      const params = {
        Message: `
          Hi,

          ${messageContent}

        `,
        Subject: "Work/Job Request : My Portfolio",
        TopicArn: "arn:aws:sns:eu-north-1:816069136450:myPortfolioNotification",
      };

      try {
        const data = await sns.publish(params).promise();
        console.log(`Message sent to SNS: ${data.MessageId}`);
      } catch (error) {
        console.error('Error sending message to SNS:', error);
      }
    },
  });
};

module.exports = { runConsumer };