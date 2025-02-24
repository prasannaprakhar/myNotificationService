const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'myPortfolioApp',
  brokers: ['host.docker.internal:9092'],
});

module.exports = kafka;