import express from 'express';
import { getKudosData, getLeaderboardData } from '../controllers/analyticsController.js';

const router = express.Router();

// Route to get Kudos data (Kudos given by type)
router.get('/kudos-data', getKudosData);

// Route to get Leaderboard data (Kudos received by users)
router.get('/leaderboard-data', getLeaderboardData);

export default router;
