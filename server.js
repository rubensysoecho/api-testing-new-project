const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json)
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) =>  {
    res.json({ message: "API connected" })
})

require("./routes/posts.routes.js")(app)

const PORT = process.env.PORT || 5500
app.listen(PORT, () =>  {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})