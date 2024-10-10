import { Router } from 'express';
import { getDuties, createDuty, updateDuty, deleteDuty } from './controllers';

const router = Router();

// Routes for the to-do list
router.get('/duties', getDuties);
router.post('/duties', createDuty);
router.put('/duties/:id', updateDuty);
router.delete('/duties/:id', deleteDuty);

export default router;
