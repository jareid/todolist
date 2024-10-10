import request from 'supertest';
import app from '../index';  // Assuming you export the express app from index.ts
import pool from '../db';    // Mock the database

// Mock the PostgreSQL pool to avoid actual DB calls
jest.mock('../db');

describe('To-Do List API Endpoints', () => {
  // Mock response data
  const mockDuties = [{ id: 1, name: 'Test Duty' }];

  // Mock the database query method
  beforeEach(() => {
    (pool.query as jest.Mock).mockReset();
  });

  /** Test GET /duties */
  it('should fetch all duties', async () => {
    // Mock the db call to return the mock duties
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockDuties });

    const response = await request(app).get('/duties');
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDuties);
  });

  /** Test POST /duties */
  it('should create a new duty', async () => {
    const newDuty = { name: 'New Duty' };

    // Mock the db call to return the inserted duty
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: 2, name: newDuty.name }] });

    const response = await request(app)
      .post('/duties')
      .send(newDuty);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, name: newDuty.name });
  });

  /** Test PUT /duties/:id */
  it('should update an existing duty', async () => {
    const updatedDuty = { id: 1, name: 'Updated Duty' };

    // Mock the db call to return the updated duty
    (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedDuty] });

    const response = await request(app)
      .put(`/duties/${updatedDuty.id}`)
      .send({ name: updatedDuty.name });

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedDuty);
  });

  /** Test DELETE /duties/:id (Optional) */
  it('should delete a duty', async () => {
    const dutyId = 1;

    // Mock the db call to return the deleted duty
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: dutyId }] });

    const response = await request(app).delete(`/duties/${dutyId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Duty deleted');
  });

  /** Test Error Handling */
  it('should return 500 if there is a server error', async () => {
    // Mock the db call to throw an error
    (pool.query as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/duties');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
