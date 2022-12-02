module.exports = app => {
    const posts = require("../controllers/posts.controller.js")
    var router = require("express").Router()

    router.post("/", posts.create)
    router.get("/getAll", posts.getAll)

    app.use("/api/posts", router)
}