import express from 'express';
import router from './routes';  // Make sure this path is correct

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route (this should respond to GET requests at "/")
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

// Use your API routes defined in routes.ts
app.use('/api', router);  // Adding a base path for API routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
