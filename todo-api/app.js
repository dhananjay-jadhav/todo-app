import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { body, param, validationResult } from 'express-validator';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const db = new sqlite3.Database('./todos.db');
db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
`);

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.get('/todos', (req, res) => {
  db.all('SELECT id, title, completed FROM todos', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get(
  '/todos/:id',
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  validate,
  (req, res) => {
    const id = req.params.id;
    db.get(
      'SELECT id, title, completed FROM todos WHERE id = ?',
      [id],
      (err, row) => {
        if (err) throw err;
        res.json(row);
      }
    );
  }
);

app.post(
  '/todos',
  body('title').isString().withMessage('Title must be a string'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
  validate,
  (req, res) => {
    const { title, completed } = req.body;
    db.run(
      'INSERT INTO todos (title, completed) VALUES (?, ?)',
      [title, completed],
      function (err) {
        if (err) throw err;
        res.json({ id: this.lastID, title, completed });
      }
    );
  }
);

app.put(
  '/todos/:id',
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('title').isString().withMessage('Title must be a string'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
  validate,
  (req, res) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    db.run(
      'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
      [title, completed, id],
      (err) => {
        if (err) throw err;
        res.json({ id, title, completed });
      }
    );
  }
);

app.patch(
  '/todos/:id',
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  validate,
  (req, res) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    const updateFields = [];
    const updateValues = [];

    if (title) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }

    if (typeof completed === 'boolean') {
      updateFields.push('completed = ?');
      updateValues.push(completed);
    }

    const updateQuery = `UPDATE todos SET ${updateFields.join(
      ', '
    )} WHERE id = ?`;

    db.run(updateQuery, [...updateValues, id], (err) => {
      if (err) throw err;
      res.json({ id, title, completed });
    });
  }
);

app.delete(
  '/todos/:id',
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  validate,
  (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
      if (err) throw err;
      res.json({ id });
    });
  }
);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
