const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send('Hello from my app! DB time: ' + result.rows[0].now);
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});

pool.query('SELECT 1')
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('DB connection failed:', err.message));

app.listen(3000, () => console.log('Server running on port 3000'));
