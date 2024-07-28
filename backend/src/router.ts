import { Router } from "express";


import createRoute from "./api/routes/rule/create.route"
import combineRoute from "./api/routes/rule/combine.route"
import evaluateRoute from "./api/routes/rule/evaluate.route"
import getRoute from "./api/routes/rule/get.route"

const router = Router();


const ruleRoutes = '/rule';

router.use(ruleRoutes, getRoute);
router.use(ruleRoutes, createRoute);
router.use(ruleRoutes, combineRoute);
router.use(ruleRoutes, evaluateRoute);

export default router;