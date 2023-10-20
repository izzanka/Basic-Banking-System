const express = require('express')
const router = require('./routers')

const app = express()

const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(express.json({strict: false}))
app.use('/api/v1', router)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})