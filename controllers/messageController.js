import { body, validationResult, matchedData } from 'express-validator';
import * as db from '../db/queries.js';

const messageController = {
  async messageListGet(req, res, next) {
    try {
      const messages = await db.getAllMessages();
      res.render('index', { title: 'Mini Message Board', messages });
    } catch (err) {
      next(err);
    }
  },
  messageNewGet(req, res) {
    res.render('form', { title: 'New Message' });
  },
  messageNewPost: [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username requires at least 1 non-whitespace character'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message requires at least 1 non-whitespace character'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .render('form', { title: 'New message', errors: errors.array() });
      const { message, username } = matchedData(req);
      try {
        await db.insertMessage(message, username);
        res.redirect('/');
      } catch (err) {
        next(err);
      }
    },
  ],
  async messageIdGet(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) {
      const error = new Error('Invalid id format');
      error.status = 400;
      return next(error);
    }
    try {
      const message = await db.getSingleMessage(id);
      if (message.length)
        res.render('message', { title: 'Message details', message });
      else {
        const error = new Error('Invalid message id');
        error.status = 404;
        next(error);
      }
    } catch (err) {
      next(err);
    }
  },
};

export default messageController;
