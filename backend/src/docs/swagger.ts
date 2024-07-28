import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs evaluator',
            version: '1.0.0',
            description: 'A evaluation engine API made using Node.js',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/rule`,
            },
        ],
    },
    apis: [
            './src/api/routes/rule/*.ts', 
        ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
