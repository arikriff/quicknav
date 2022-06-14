const express = require('express')
require('./db/mongoose')
//const tourRouter = require('./routers/tour')
//const guideRouter = require('./routers/guide')

const app = express()
const port = 3000

app.use(express.json())
//app.use(tourRouter)
//app.use(guideRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})