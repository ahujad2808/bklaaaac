import { Router } from 'express';
import { getRules } from '../../controller/rule/get.controller';

const router = Router();

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Gets all rules
 *     description: Fetches all the rules from the database
 *     tags:
 *       - Rules
 *     responses:
 *       200:
 *         description: Rules fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Rules fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cktgzx1nx0002h6zk1mvxekb7
 *                       rule:
 *                         type: string
 *                         example: age > 18 && country == 'US'
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/get', getRules);

export default router;