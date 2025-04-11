const { Pool } = require('pg');

const pool = new Pool({
  user: 'logit_media_user',
  host: 'dpg-cvs56sc9c44c739pkorg-a.ohio-postgres.render.com',
  database: 'logit_media',
  password: 'oaMyx8IZic7vSxvFX9AOydITML3SaUOl',
  port: 5432,
  ssl: { rejectUnauthorized: false }, // Required for Render
});

module.exports = pool;