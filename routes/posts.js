module.exports = app => {
    const posts = require("../controllers/posts.controller.js")
    var router = require("express").Router()

    router.post("/", posts.create)

    app.use("/api/posts", router)
}