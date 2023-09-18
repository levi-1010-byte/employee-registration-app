const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to Postgres database');

  
    createEmployeeTable();
  }
});

function createEmployeeTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employeeDatatable (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      department VARCHAR(255),
      position VARCHAR(255),
      start_date DATE
    );
  `;

  client.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating employee table:', err);
    } else {
      console.log('Employee table created successfully');
    }

  
   
  });
}


module.exports = client;
