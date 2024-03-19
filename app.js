const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const sequelize = require('./sequelize');
const User = require('./models/user');

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({
      message:
        'Une erreur est survenue lors de la récupération des utilisateurs.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});

sequelize.sync({ force: true }).then(() => {
  console.log('Base de données synchronisée');
  User.create({
    name: 'John Doe',
    email: 'john@example.com',
  });
});
