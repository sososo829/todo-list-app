import migrate from 'node-pg-migrate';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || '5432'),
});

const runMigrations = async () => {
  try {
    await migrate({
      databaseUrl: process.env.DATABASE_URL || 'localhost', 
      dir: './migrations', 
      direction: 'up', 
      migrationsTable: 'pgmigrations',
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await pool.end(); 
  }
};

runMigrations();
