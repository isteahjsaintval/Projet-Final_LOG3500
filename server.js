import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sèvi fichye statik ki nan dist/ apre build
app.use(express.static(path.join(__dirname, 'dist')));

// API POST pou kontak ak persistance nan data/messages.json
app.post('/api/contact', (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tout chan yo obligatwa.' });
  }

  const newMessage = {
    id: Date.now(),
    nom,
    email,
    message,
    date: new Date().toISOString()
  };

  const dataDir = path.join(__dirname, 'data');
  const filePath = path.join(dataDir, 'messages.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let messages = [];
  if (fs.existsSync(filePath)) {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(fileData || '[]');
    } catch (err) {
      messages = [];
    }
  }

  messages.push(newMessage);

  fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erè nan anregistreman mesaj la.' });
    }
    return res.status(200).json({ success: true, message: 'Mesaj voye ak siksè!' });
  });
});

// Redirije tout lòt rout sou index.html (SPA client routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur ap kouri sou pòt ${PORT}`);
});
