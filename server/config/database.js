import pg from 'pg';
import './dotenv.js'

// const config = {
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE
// }

export const pool = new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}})
//console.log('Database URL:', process.env.DATABASE_URL);