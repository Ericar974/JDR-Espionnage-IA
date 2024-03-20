const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./sequelize');
const Mission = require('./models/mission');
const countries = require('./countries');

app.use(express.json());

/**
 * GET route to retrieve missions.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/missions', async (req, res) => {
  try {
    // Find all missions in database
    const missions = await Mission.findAll();
    res.json(missions);
  } catch (error) {
    // Log the error in case the request fails and return a 500 error message.
    console.error('Error fetch missions :', error);
    res.status(500).json({
      message: 'Error fetch missions.',
    });
  }
});

/**
 * GET route to retrieve a mission by its UUID.
 *
 * @param {string} uuid '/missions/:uuid' - The path of the route with 'uuid' as a parameter.
 * @param {Function} async (req, res) - The asynchronous route handler function.
 */
app.get('/missions/:uuid', async (req, res) => {
  try {
    // Extract the UUID from the route parameters.
    const { uuid } = req.params;

    // Search for the mission by its UUID in the database.
    const mission = await Mission.findOne({
      where: {
        uuid,
      },
    });

    // If the mission is not found, return a 404 error message.
    if (!mission) {
      return res.status(404).json({
        message: 'Mission not found.',
      });
    }

    // If the mission is found, return the mission to the client.
    res.json(mission);
  } catch (error) {
    // Log the error in case the request fails and return a 500 error message.
    console.error('Error fetching mission by UUID:', error);
    res.status(500).json({
      message: 'Error fetching mission by UUID.',
    });
  }
});


// route pour lister les catégories de news
app.get('/news/categories', async (req, res) => {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.NEWS_API_KEY}`);
        const data = await response.json();
        const categories = data.sources.map(source => source.category);
        const uniqueCategories = [...new Set(categories)];
        res.json(uniqueCategories);
    } catch (error) {
        console.error('Error fetching news categories:', error);
        res.status(500).json({
            message: 'Error fetching news categories.',
        });
    }

});

/**
 * Route pour récupérer une news depuis newsapi pour générer la mission
 */
app.get('/news/generate-mission', async (req, res) => {
  try {
    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=fr&category=technology&apiKey=${process.env.NEWS_API_KEY}` // Exemple avec la catégorie technologie
    );
    const data = await response.json();

    // Assurez-vous qu'il y a des articles à traiter
    if (data.articles.length > 0) {
      // Sélection aléatoire d'un article parmi les articles retournés
      const articleIndex = Math.floor(Math.random() * data.articles.length);
      const article = data.articles[articleIndex];

      // Renvoie l'article sélectionné aléatoirement en réponse
      return res.json(article);
    } else {
      return res.status(404).json({
        message: 'No news found.',
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      message: 'Error fetching news.',
    });
  }
});

app.get('/news/generate-mission/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=fr&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
        );
        const data = await response.json();

        if (data.articles.length > 0) {
        const articleIndex = Math.floor(Math.random() * data.articles.length);
        const article = data.articles[articleIndex];
        return res.json(article);
        } else {
        return res.status(404).json({
            message: 'No news found.',
        });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
        message: 'Error fetching news.',
        });
    }
});


app.listen(PORT, () => {
  console.log(`server launch on http://localhost:${PORT}`);
});

// Generate Fixtures
sequelize.sync({ force: true }).then(() => {
  const currentDate = new Date();
  Mission.create({
    country: countries.FR,
    place: 'Eiffel Tower',
    date: currentDate.setTime(currentDate.getTime() + 24 * 3600 * 1000),
  });
});
