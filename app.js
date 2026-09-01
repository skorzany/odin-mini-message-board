import express from 'express';
import { fileURLToPath } from 'url';
import router from './routes/router.js';
import CustomNotFoundError from './errors/CustomNotFoundError.js';

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

const assetsPath = fileURLToPath(new URL('./public', import.meta.url));
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use('/', router);
app.use((req, res, next) => {
  const error = new CustomNotFoundError(`Not found: ${req.originalUrl}`);
  next(error);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
