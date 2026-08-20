import {Pool} from "pg";
import "dotenv/config"

const DB_PASSWORD = process.env.DB_PASSWORD

const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "study_manager",
    password: DB_PASSWORD,
    port: 5432,
});

export default pool;