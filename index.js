const app = require('express')()
const db = require('./config/db')
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Tasks API",
            description: "Tasks API Information",
            contact: {
                name: "Elton Costa"
            },
            servers: ["http://localhost:3000"]
        }
    },
    // ['.routes/*.js']
    //apis: ["index.js"]
    apis: ['./api/*.js', './config/routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/teste', (req, res) => {
    res.status(200).send('Meu backend!')
})

app.listen(3000, () => {
    console.log('Backend executando...')
})