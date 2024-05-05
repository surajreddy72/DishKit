// fbRoute.js

import express from 'express';
import { addFeedback, listFeedback } from '../controllers/fbcontroller.js';

const fbRouter = express.Router();

// Simpler and more intuitive endpoint paths
fbRouter.post("/", addFeedback); // Matches POST /api/feedback
fbRouter.get('/', listFeedback); // Matches GET /api/feedback

export default fbRouter;
