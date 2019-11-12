import express from 'express';
import v1Api from './v1';

const router = express.Router();

router.use('/v1', v1Api);

export default router;
