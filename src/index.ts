import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
app.use(express.json());

// Get all duties
app.get('/duties', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM duties');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new duty
app.post('/duties', async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO duties (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a duty
app.put('/duties/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query('UPDATE duties SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Duty not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a duty (Optional)
app.delete('/duties/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM duties WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Duty not found' });
    }
    res.json({ message: 'Duty deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
