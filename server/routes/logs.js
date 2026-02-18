import express from 'express';
import {
    getLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
} from '../controllers/logController.js';

const router = express.Router();

// GET all logs
router.get('/', getLogs);

// GET single log by id 
router.get('/:id', getLogById);

// POST create new log
router.post('/', createLog);

// PUT update log by id
router.put('/:id', updateLog);

// DELETE log by id
router.delete('/:id', deleteLog);

export default router;