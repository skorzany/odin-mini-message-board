#! /usr/bin/env node

import { Client } from 'pg';
import { argv } from 'node:process';

const CREATEDB = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR ( 255 ) NOT NULL,
    username VARCHAR ( 40 ) NOT NULL,
    added TIMESTAMP WITH TIME ZONE NOT NULL
);
`;
const INSERTDB = `
INSERT INTO messages (text, username, added) VALUES
    ('Hi there!', 'Amando', $1),
    ('Hello world!', 'Charles', $1);
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({ connectionString: argv[2] });
  await client.connect();
  await client.query(CREATEDB);
  await client.query(INSERTDB, [new Date()]);
  await client.end();
  console.log('Done!');
  process.exit(0);
}

main();
