const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { dbCnxStr } = require('./config/key')
const usersRouter = require('./routers/users')
const cookieParser = require('cookie-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const logger = require('morgan');
const { errorHandler, notFoundHandler } = require('./midelwares/errors-handlers');

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
}))
app.use(cookieParser())
app.use(logger('dev'));

mongoose.connect(dbCnxStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => {
        console.log('Data base connected')
    }
).catch(err => {
    console.log('Db connexion error', err)
})
const PORT = process.env.PORT || 5000

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "My App API documentation",
            description: "This documentation is built using SWAGGER",
            contact: {
                name: "Amazing Developer",
            },
            servers: [
                `http://localhost:${PORT}`
            ]
        }
    },
    apis: ["./routers/api-doc/*.yaml"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/users', usersRouter)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, (req, res) => {
    console.log('App listen on port', PORT)
})