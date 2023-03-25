const express = require("express")
const router = require("./routes")
const app = express()
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")
const port = 3000
require('dotenv').config()


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.use(errorHandler)
app.listen(port, () => {
    console.log(`server run on port ${port}`);
})