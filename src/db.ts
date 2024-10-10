import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost',
  database: 'todolist',
  password: 'postgres',
  port: 5432,
});

export default pool;
