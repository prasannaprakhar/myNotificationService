const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Notification',
  password: 'Mac@5807',
  port: '5433',
});

module.exports = pool;