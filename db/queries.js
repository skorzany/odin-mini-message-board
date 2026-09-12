import pool from './pool.js';

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function getSingleMessage(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    id,
  ]);
  return rows;
}

async function insertMessage(text, username) {
  await pool.query(
    'INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)',
    [text, username, new Date()],
  );
}

export { getAllMessages, getSingleMessage, insertMessage };
