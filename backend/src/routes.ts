import { Router } from 'express';
import { getDuties, createDuty, updateDuty, deleteDuty } from './controllers';  // Ensure these are correctly defined

const router = Router();

// Define your API routes
router.get('/duties', getDuties);              // Fetch all duties
router.post('/duties', createDuty);            // Create a new duty
router.put('/duties/:id', updateDuty);         // Update a duty
router.delete('/duties/:id', deleteDuty);      // Delete a duty

export default router;
