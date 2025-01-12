import express from 'express';
import {
  createKudo,
  getAllKudos,
//   getKudoById,
//   updateKudo,
  // deleteKudo,
  likeKudo,
  
} from '../controllers/kudosController.js';

const router = express.Router();

// Define the routes
router.post('/kudos', createKudo);  // Create a new Kudo
router.get('/kudos', getAllKudos);  // Get all Kudos
// router.get('/kudos/:id', getKudoById);  // Get a single Kudo by ID
// router.put('/kudos/:id', updateKudo);  // Update a Kudo
// router.delete('/kudos/:id', deleteKudo);  // Delete a Kudo
router.put('/kudos/like/:id', likeKudo);

export default router;
