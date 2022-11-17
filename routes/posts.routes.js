module.exports = app => {
    const posts = require("../controllers/posts.controller.js")

    var router = require("express").Router()

    router.posts("/", posts)


}