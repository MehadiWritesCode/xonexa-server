import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.SUPABASE_DATABASE_URL_DIRECT;

if (!connectionString) {
  console.error("❌ SUPABASE_DATABASE_URL_DIRECT environment variable is missing!");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err, client) => {
  console.error('⚠️ Unexpected error on idle PostgreSQL client (FATAL):', err.message, 'Code:', err.code);

});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error on idle client', err);
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Pool connected successfully!');
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

export default pool;




