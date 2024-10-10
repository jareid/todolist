import express from 'express';
import router from './routes';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
