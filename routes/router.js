import { Router } from 'express';
import messageController from '../controllers/messageController.js';

const router = Router();

router.get('/', messageController.messageListGet);
router.get('/new', messageController.messageNewGet);
router.post('/new', messageController.messageNewPost);
router.get('/message/:id', messageController.messageIdGet);

export default router;
