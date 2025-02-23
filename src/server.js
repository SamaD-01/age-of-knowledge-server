const express = require('express');
const app = express();
const cors = require('cors');
// const pool = require('./libs/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.route');
const questionRoutes = require('./routes/question.route');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Age Of Knowledge API',
            version: '1.0.0',
            description: 'Express Library API for Age Of Knowledge game',
        },
        servers: [
            {
                url: "http://localhost:5001/",
                description: "Local Development server"
            },
        ],  
    },
    apis: ['./src/routes/*.route.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("TEST Age of Knowledge API");
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
});