import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost',
  database: 'todolist',
  password: 'password', // Your PostgreSQL password
  port: 5432,
});

export default pool;
