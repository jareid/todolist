import request from 'supertest';
import app from '../index';
import pool from '../db';

jest.mock('../db');

describe('To-Do List API', () => {
  const mockDuties = [{ id: 1, name: 'Test Duty' }];

  beforeEach(() => {
    (pool.query as jest.Mock).mockReset();
  });

  it('should fetch all duties', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockDuties });
    const response = await request(app).get('/duties');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDuties);
  });

  it('should create a new duty', async () => {
    const newDuty = { name: 'New Duty' };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 2, name: 'New Duty' }] });
    const response = await request(app).post('/duties').send(newDuty);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, name: 'New Duty' });
  });

  it('should update a duty', async () => {
    const updatedDuty = { name: 'Updated Duty' };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 1, name: 'Updated Duty' }] });
    const response = await request(app).put('/duties/1').send(updatedDuty);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Updated Duty' });
  });

  it('should delete a duty', async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 1 }] });
    const response = await request(app).delete('/duties/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Duty deleted');
  });
});
