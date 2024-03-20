import express, { Request, Response } from 'express';
import { ScenariosSchema} from "../api-schema/scenario.t";
import Scenario from "../models/scenario";
import {v4 as uuidV4} from "uuid";
import {GetApiError} from "../api-schema/error";

const router = express.Router();


/**
 * GET route to get all scenarios.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {ScenariosSchema[]} Array of Mission objects.
 */
router.get(
  '/',
  async (req: Request, res: Response<ScenariosSchema[] | GetApiError>) => {
      console.log("get scenarios")
    try {
      const scenarios = await Scenario.findAll();
     return  res.json(scenarios);
    } catch (error) {
      console.error('Error fetch scenarios:', error);
      res.status(500).json({ message: 'Error fetch scenarios.' });
    }
  }
);


/**
 * Route pour récupérer une news depuis newsapi pour générer la mission
 */
router.post('/generate-scenario', async (req, res) => {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=fr&category=technology&apiKey=${process.env.NEWS_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching news: ${response.statusText}`);
        }

        const newsData: any = await response.json();

        if (newsData.articles.length > 0) {
            const firstArticle = newsData.articles[0];

            const scenario = await Scenario.create({
                id: `sce-${uuidV4()}`,
                title: firstArticle.title,
                description: firstArticle.description,
                source: firstArticle.url, // Assuming 'source' is the URL of the article
                publishedDate: firstArticle.publishedAt,
                missionId: null,
            });

            // Send back the created scenario details with a 201 status code
            // Note: No need to call scenario.toJSON() explicitly as res.json() handles Sequelize models gracefully
            res.status(201).json({
                message: 'Scenario generated successfully',
                scenario,
            });

        } else {
            res.status(404).json({
                message: 'No news articles found.',
            });
        }

    } catch (error) {
        console.error('Error:', error);
        // Ensure no response has been sent before sending the error response
        if (!res.headersSent) {
            res.status(500).json({
                message: 'Error generating scenario.',
            });
        }
    }
});

/**
 * GET route to get scenario by UUID.
 *
 * @param {Function} async (req, res) - The asynchronous route handler function.
 * @returns {ScenariosSchema} Scenario object.
 */
router.get(
    '/:uuid',
    async (req: Request, res: Response<ScenariosSchema | GetApiError>) => {
        try {
            const { uuid } = req.params;
            const scenario = await Scenario.findOne({ where: { id: uuid } });

            if (!scenario) {
                return res.status(404).json({ message: 'Scenario not found.' });
            }

            res.json(scenario);
        } catch (error) {
            console.error('Error fetching scenario by UUID:', error);
            res.status(500).json({ message: 'Error fetching scenario by UUID.' });
        }
    }
);

/***
 * x(id, feedback: string) => scenario modifié enregistré
 * exemple
 * scénario initial : Découvrez la révolution horlogère : la montre "Monday" de Renaud Tixier
 * feedback : "Année 1970, Paris"
 * @example
 * ```json
 * {
 * "feedback": "Année 1970, Paris"
 * }
 * ```
 * résultat : Contexte : Année 1970, Paris Découvrez la révolution horlogère : la montre "Monday" de Renaud Tixier
 **/
router.put('/:uuid', async (req, res) => {
    console.log("put scenarios")
    try {
        const {uuid} = req.params;
        const {feedback} = req.body;
        // place, year

        const scenario = await Scenario.findOne({where: {id: uuid}});
        if (!scenario) {
            return res.status(404).json({message: 'Scenario not found.'});
        }

        scenario.description = `Contexte : ${feedback} ${scenario.title}`;
        await scenario.save();

        res.json(scenario);
    } catch (error) {
        console.error('Error updating scenario:', error);
        res.status(500).json({message: 'Error updating scenario.'});
    }
});




export default router;
