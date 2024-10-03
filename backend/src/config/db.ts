import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || '5432'),
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => {
    console.log(process.env)
    console.error('Connection error', err.stack)
  });

export default pool;
