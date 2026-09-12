import { loadEnvFile } from 'node:process';
import { Pool } from 'pg';

loadEnvFile();

const pool = new Pool({ connectionString: process.env.DB_CONNECTION_STRING });

export default pool;
