import { Router } from 'express';
import { combineRules } from '../../controller/rule/combine.controller';

const router = Router();

/**
 * @swagger
 * /combine:
 *   post:
 *     summary: Combine multiple rules
 *     description: Combines multiple rule strings into a single AST and returns the combined rule object.
 *     tags:
 *       - Rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rules
 *             properties:
 *               rules:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of rule strings to be combined.
 *                 example: ["age > 18 AND country == 'US'", "salary > 50000 OR experience > 5"]
 *     responses:
 *       200:
 *         description: Rules combined successfully
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
 *                   example: Rules combined successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cktgzx1nx0002h6zk1mvxekb7
 *                     combinedRule:
 *                       type: string
 *                       example: (age > 18 AND country == 'US') AND (salary > 50000 OR experience > 5)
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-01-01T00:00:00.000Z
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
router.post('/combine', combineRules);

export default router;
