import express from 'express';
import pool from './db';

const app = express();
app.use(express.json());

// Your routes here...

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
