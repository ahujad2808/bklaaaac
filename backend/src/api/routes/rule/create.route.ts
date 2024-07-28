import { Router } from 'express';
import { createRule } from '../../controller/rule/create.controller';

const router = Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new rule
 *     description: Creates a new rule and returns the created rule object.
 *     tags:
 *       - Rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ruleString
 *             properties:
 *               ruleString:
 *                 type: string
 *                 description: The rule string to be created.
 *                 example: "age > 18 AND country == 'US'"
 *     responses:
 *       200:
 *         description: Rule created successfully
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
 *                   example: Rule created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cktgzx1nx0002h6zk1mvxekb7
 *                     rule:
 *                       type: string
 *                       example: age > 18 AND country == 'US'
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

router.post('/create', createRule);

export default router;