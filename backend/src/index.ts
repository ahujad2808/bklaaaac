import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { swaggerUi, swaggerDocs } from '../src/docs/swagger';
import session from "express-session";

import router from './router'

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware() {
        this.app.use(cors({ credentials: true }));
        this.app.use(compression());
        this.app.use(bodyParser.json());
    }
    
    private configureRoutes() {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.app.use('/api', router);
    }
}

export default new App().app;