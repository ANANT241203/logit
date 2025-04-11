const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// This endpoint handles GET requests to /book-author and queries the books table for the author of a book matching the title:
app.get('/book-author', async (req, res) => {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }
    try {
      const query = 'SELECT authors FROM books WHERE LOWER(title) ILIKE LOWER($1) LIMIT 1';
      const result = await pool.query(query, [`%${title}%`]);
      if (result.rows.length > 0) {
        res.json({ authors: result.rows[0].authors });
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });
  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend API is running on http://localhost:${PORT}`);
});