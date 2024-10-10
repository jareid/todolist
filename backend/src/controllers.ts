import { Request, Response } from 'express';
import pool from './db';
import { Duty } from './types';

// Get all duties
export const getDuties = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query('SELECT * FROM duties');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create a new duty
export const createDuty = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body as Duty;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const result = await pool.query('INSERT INTO duties (name) VALUES ($1) RETURNING *', [name]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing duty
export const updateDuty = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name } = req.body as Duty;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const result = await pool.query('UPDATE duties SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Duty not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a duty
export const deleteDuty = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM duties WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Duty not found' });
    }

    return res.status(200).json({ message: 'Duty deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
