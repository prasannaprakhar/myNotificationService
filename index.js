require('dotenv').config();
const app = require('./app');
// const { runConsumer } = require('./services/kafkaConsumer');

// Start the express server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // runConsumer().catch(console.error);
});