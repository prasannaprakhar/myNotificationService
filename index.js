require('dotenv').config();
const app = require('./app');
// const { runConsumer } = require('./services/kafkaConsumer');

// Start the express server
const port = 6000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   // runConsumer().catch(console.error);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});