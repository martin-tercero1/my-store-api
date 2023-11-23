const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost', // because we are using docker
    port: 5432,
    user: 'martin',
    password: 'admin123',
    database: 'my_store',
  });

  await client.connect();
  return client;
}

module.exports = getConnection
