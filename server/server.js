const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})