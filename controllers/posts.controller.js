const Posts = require("../models/posts.model.js")

exports.create = (req, res) =>  {
    if (!req.body)  {
        res.status(400).send({
            message: "❌ El contenido no puede estar vacío!"
        })
    }


    const tutorial = new Posts({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    })

    Posts.create(tutorial, (err, data) =>    {
        if (err)
            res.status(500).send({
                message:
                    err.message || "❌Error al crear el tutorial."
            })
        else res.send(data)
    })
}

exports.findAll = (req, res) => {
    const title = req.query.title

    Posts.getAll(title, (err, data) =>   {
        if (err)
            res.status(500).send({
                message:
                    err.message || "❌Error al listar los tutoriales."
            })
        else res.send(data)
    })
}