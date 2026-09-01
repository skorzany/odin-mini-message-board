import { Router } from 'express';

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];
const router = Router();

router.get('/new', (req, res) => res.render('form', { title: 'New message' }));
router.post('/new', (req, res) => {
  const user = req.body.username;
  const text = req.body.message;
  messages.push({ text, user, added: new Date() });
  res.redirect('/');
});
router.get('/message/:messageId', (req, res) => {
  res.render('message', {
    title: 'Message details',
    message: messages[req.params.messageId],
  });
});
router.get('/', (req, res) =>
  res.render('index', { title: 'Mini Message Board', messages }),
);

export default router;
