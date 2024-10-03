import { Router } from 'express';
import { createDuty, getDutyById } from '../controllers/dutyController';

const router = Router();

router.post('/duties', createDuty);
router.get('/duties/:id', getDutyById);

export default router;
