require("dotenv/config")

const cors = require("cors")
const express = require('express')
const routes = require('./routes')

const cookieParser= require("cookie-parser")

const uploadConfig = require('./configs/upload')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  // origin:["http://localhost:5173", "http://127.0.0.1:5173"],
  origin:["https://foodexplorerdevporto.netlify.app"],
  
  credentials: true
}));

app.use(routes)

app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER))

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log("ON", PORT))