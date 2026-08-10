import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // load env variables

const { Pool } = pg; //create new pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // connection string from env variable
});

export default pool;