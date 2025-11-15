// server.js - simples API usando lowdb (arquivo JSON) para demonstração
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Low, JSONFile } = require('lowdb');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data = db.data || { complaints: [], companies: [] };
  await db.write();
}
initDB();

// List complaints
app.get('/complaints', async (req, res) => {
  await db.read();
  res.json(db.data.complaints);
});

// Create complaint
app.post('/complaints', async (req, res) => {
  await db.read();
  const item = { id: Date.now().toString(), ...req.body };
  db.data.complaints.unshift(item);
  await db.write();
  res.status(201).json(item);
});

// Get complaint
app.get('/complaints/:id', async (req, res) => {
  await db.read();
  const item = db.data.complaints.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Reply to complaint
app.post('/complaints/:id/reply', async (req, res) => {
  await db.read();
  const item = db.data.complaints.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  item.reply = req.body.message;
  item.status = 'respondido';
  await db.write();
  res.json(item);
});

// Companies (simple)
app.get('/companies', async (req, res) => {
  await db.read();
  res.json(db.data.companies);
});

app.post('/companies', async (req, res) => {
  await db.read();
  const item = { id: Date.now().toString(), ...req.body };
  db.data.companies.unshift(item);
  await db.write();
  res.status(201).json(item);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
