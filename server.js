```javascript
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure database folder exists
const dbPath = path.join('/tmp', 'db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('✅ Connected to SQLite Database');
  }
});

// Create Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS parking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    city TEXT,
    total_slots INTEGER,
    available_slots INTEGER,
    price_per_hour INTEGER,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    parking_id INTEGER,
    booking_date DATE,
    start_time TEXT,
    end_time TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Default Admin
  db.get("SELECT * FROM users WHERE email = 'admin@parkfinder.com'", (err, row) => {
    if (!row) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);

      db.run(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ['Admin', 'admin@parkfinder.com', hashedPassword, 'admin']
      );

      console.log('👑 Default Admin created');
    }
  });
});

// ==================== API ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running!' });
});

// REGISTER
app.post('/api/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email and password are required'
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
      "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword],
      function (err) {
        if (err) {
          return res.status(400).json({
            error: 'Email already exists'
          });
        }

        res.json({
          success: true,
          message: 'User registered successfully'
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: 'Server error'
    });
  }
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }

      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        'parkfinder-secret-key',
        {
          expiresIn: '24h'
        }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  );
});

// Get All Parking
app.get('/api/parking', (req, res) => {
  db.all(
    "SELECT * FROM parking ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: 'Database error'
        });
      }

      res.json(rows);
    }
  );
});

// Add Parking
app.post('/api/parking', (req, res) => {
  const {
    name,
    address,
    city,
    total_slots,
    price_per_hour
  } = req.body;

  db.run(
    `INSERT INTO parking 
    (name, address, city, total_slots, available_slots, price_per_hour)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      address,
      city,
      total_slots,
      total_slots,
      price_per_hour
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: 'Failed to add parking'
        });
      }

      res.json({
        success: true,
        message: 'Parking added successfully',
        id: this.lastID
      });
    }
  );
});

// Create Booking
app.post('/api/bookings', (req, res) => {
  const {
    parking_id,
    booking_date,
    start_time,
    end_time
  } = req.body;

  const user_id = 1;

  db.get(
    "SELECT available_slots FROM parking WHERE id = ?",
    [parking_id],
    (err, parking) => {
      if (err || !parking) {
        return res.status(404).json({
          error: 'Parking not found'
        });
      }

      if (parking.available_slots <= 0) {
        return res.status(400).json({
          error: 'No slots available'
        });
      }

      db.run(
        `INSERT INTO bookings 
        (user_id, parking_id, booking_date, start_time, end_time)
        VALUES (?, ?, ?, ?, ?)`,
        [
          user_id,
          parking_id,
          booking_date,
          start_time,
          end_time
        ],
        function (err) {
          if (err) {
            return res.status(500).json({
              error: 'Booking failed'
            });
          }

          db.run(
            "UPDATE parking SET available_slots = available_slots - 1 WHERE id = ?",
            [parking_id]
          );

          res.json({
            success: true,
            message: '🎉 Booking confirmed successfully!'
          });
        }
      );
    }
  );
});

// Serve Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
```
