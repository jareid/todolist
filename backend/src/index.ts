import express from 'express';
import router from './routes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route (to test if server is working)
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

// Use other API routes (for to-do duties)
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
