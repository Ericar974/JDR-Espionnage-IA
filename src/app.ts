/**
 * Main Application File: app.js
 *
 * This file initializes the Express application, sets up middleware for JSON parsing and serving static files,
 * and defines the application's routes. It imports mission and game routes from separate files for better organization,
 * and includes a route for dynamically serving character images from a specified directory. Additionally, it listens
 * on a port defined in the environment variables for incoming connections. This file also triggers the database
 * synchronization and initial data setup for missions.
 */

import 'dotenv/config';
import express from 'express';
import path from 'path';
import countries from './countries';

import sequelize from './sequelize';
import Mission from './models/mission';

// Import routes
import missionsRoutes from './routes/mission/mission';
import gamesRoutes from './routes/game/game';
import charactersRoutes from './routes/character/character';

/*
 * Imports `swagger-ui-express` to serve Swagger UI documentation in your Express application.
 * */
const swaggerUi = require('swagger-ui-express');

/*
 * Imports the `yamljs` module. This module is used for loading and parsing YAML files.
 * */
const YAML = require('yamljs');

/**
 * Loads the Swagger document from a YAML file located at `./src/doc/swagger.yaml`.
 * This document contains your API's specification, detailing routes, parameters, responses, etc.
 */
const swaggerDocument = YAML.load('./src/doc/swagger.yaml');

/**
 * Create express instance
 */
const app = express();

/**
 * Setup project launch port
 */
const PORT: number = +(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Use the imported routes
app.use('/api/mission', missionsRoutes);
app.use('/api/game', gamesRoutes);
app.use('/api/character', charactersRoutes);

// Add swagger api route
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`server launch on http://localhost:${PORT}`);
});

// Generate Fixtures exemple
sequelize.sync({ force: true }).then(() => {
  const currentDate = new Date();
  Mission.create({
    country: countries.FR,
    place: 'Eiffel Tower',
    date: new Date(
      currentDate.setTime(currentDate.getTime() + 24 * 3600 * 1000)
    ),
  });
});
