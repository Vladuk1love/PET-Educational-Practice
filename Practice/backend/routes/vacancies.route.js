import { Router } from 'express';
import {
    getVacancies,
    searchVacancies
} from '../controllers/vacancies.controller.js';

const router = Router();

router.get('/', getVacancies);
router.post('/search', searchVacancies);

export default router;