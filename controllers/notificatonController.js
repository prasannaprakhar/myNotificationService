require('dotenv').config();
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const pool = require('../db');

// Configure AWS SDK v3
const snsClient = new SNSClient({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: "AKIA34AMC2BBCV77MF6Q",
    secretAccessKey: "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",
  },
});

const getHello = (req, res) => {
  console.log('Hello from notification controller');
  res.status(200).send('Hello from notification controller');
};

const healthCheck = (req, res) => {
  console.log('Hello from notification controller');
  res.status(200).send('Health check passed');
};

const getNotificationData = async (req, res) => {
  const notificationData = req.body;
  console.log('Notification Data:', notificationData);
  try {
    // Insert notification data into PostgreSQL
    const query = 'INSERT INTO notifications(data) VALUES($1) RETURNING *';
    const values = [notificationData];
    const result = await pool.query(query, values);
    console.log('Data inserted into PostgreSQL:', result.rows[0]);

    try {
      // Send message to SNS
      const params = {
        Message: `
          Hi,

          ${notificationData.message}
        `,
        Subject: 'Work/Job Request : My Portfolio',
        TopicArn: 'arn:aws:sns:eu-north-1:816069136450:myPortfolioNotification',
      };
      const command = new PublishCommand(params);
      const data = await snsClient.send(command);
      res.status(200).send(`Message sent to SNS: ${data.MessageId}`);
    } catch (snsError) {
      console.error('Error sending message to SNS:', snsError);
      res.status(500).send(`Error producing message in SNS: ${snsError.message}`);
    }
  } catch (dbError) {
    console.error('Error inserting data into PostgreSQL:', dbError);

    if (dbError.code === 'ECONNREFUSED') {
      res.status(500).send('Database connection was refused.');
    } else if (dbError.code === '23505') {
      res.status(409).send('Duplicate entry.');
    } else if (dbError instanceof SyntaxError) {
      res.status(400).send('Invalid JSON syntax.');
    } else {
      res.status(500).send(`Database error: ${dbError.message}`);
    }
  }
};

module.exports = {
  healthCheck,
  getNotificationData,
  getHello,
};