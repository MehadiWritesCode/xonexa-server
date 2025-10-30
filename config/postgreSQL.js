// import { Pool } from 'pg'; 
// import dotenv from 'dotenv';

// dotenv.config();

// const connectionString = process.env.SUPABASE_DATABASE_URL_DIRECT; 

// if (!connectionString) {
//     console.error("❌ SUPABASE_DATABASE_URL_DIRECT environment variable is missing!");
//     process.exit(1); 
// }

// const pool = new Pool({
//     connectionString: connectionString,
//     ssl: {
//         rejectUnauthorized: false 
//     }
// });

// pool.connect()
//   .then(() => console.log("✅ PostgreSQL Pool connected successfully!"))
//   .catch(err => console.error("❌ Database connection failed (ENOTFOUND may indicate DNS issue, check network):", err)); 

// export default pool;

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
    rejectUnauthorized: false // critical for Supabase
  }
});

pool.on('error', (err, client) => {
  // FATAL এররটি ধরুন, যাতে পুরো অ্যাপ্লিকেশন ক্র্যাশ না করে।
  console.error('⚠️ Unexpected error on idle PostgreSQL client (FATAL):', err.message, 'Code:', err.code);
  // পুল স্বয়ংক্রিয়ভাবে এই ক্লায়েন্টকে সরিয়ে দেবে এবং নতুন সংযোগ তৈরি করবে।
});

// Handle unexpected errors on the pool
pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error on idle client', err);
});

// Optional: Test connection safely
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




