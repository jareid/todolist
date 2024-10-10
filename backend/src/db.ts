import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'todolist',
  password: 'your_postgres_password',
  port: 5432,
});

export default pool;
