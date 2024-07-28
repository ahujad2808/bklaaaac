import { Router } from 'express';
import { evaluateRule } from '../../controller/rule/evaluate.controller';

const router = Router();

/**
 * @swagger
 * /evaluate:
 *   post:
 *     summary: Evaluate a rule
 *     description: Evaluates a rule against provided data and returns the evaluation result.
 *     tags:
 *       - Rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rule
 *               - data
 *             properties:
 *               rule:
 *                 type: string
 *                 description: The rule string to be evaluated.
 *                 example: "age > 18 && country == 'US'"
 *               data:
 *                 type: object
 *                 description: The data to be evaluated against the rule.
 *                 example: { "age": 20, "country": "US", "salary": 60000, "experience": 3 }
 *     responses:
 *       200:
 *         description: Rule evaluated successfully
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
 *                   example: Rule evaluated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: boolean
 *                       example: true
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
router.post('/evaluate', evaluateRule);

export default router;