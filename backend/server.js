const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync(USERS_FILE));
  const exists = data.users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: 'User already exists' });

  data.users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
  res.json({ message: 'Registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = data.users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));
