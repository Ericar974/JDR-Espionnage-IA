const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nom de ton API',
      version: '1.0.0',
      description: 'Une description de ton API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;


