const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const app = express()

// introduce environment variables
dotenv.config()
const port = process.env.PORT || 3000

// define the app
const compiler = webpack(webpackConfig)
app.use(require('webpack-dev-middleware')(compiler))
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(morgan('combined'))
app.use(bodyParser.json())

// security middle-ware
const cors = require('cors')
const helmet = require('helmet')

app.use(helmet())
app.use(cors())

// define routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

// start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
