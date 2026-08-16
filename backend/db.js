import {Pool} from "pg";

const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "study_manager",
    password: "yod2026", // УБЕРИ ПАРОЛЬ ОТСЮДА В .env
    port: 5432,
});

export default pool;