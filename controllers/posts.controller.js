const Posts = require("../models/posts.model.js")

exports.create = (req, res) =>  {
    if (!req.body)  {
        res.status(400).send({
            message: "❌ El contenido no puede estar vacío!"
        })
    }

    const posts = new Posts({
        title: req.body.title,
        userID: req.body.userID,
        image: req.body.image,
        description: req.body.description || false,
        published_date: req.body.published_date
    })

    Posts.create(posts, (err, data) =>    {
        if (err)    {
            res.status(500).send({
                message:
                    err.message || "❌ Error al crear el tutorial."
            })
        }
        else    {
            res.send(data)
            console.log("Post creado.")
        } 
    })
}

exports.findById = (req, res) => {
    const id = req.params.id
    Posts.findById(id, (err, data) =>    {
        if (err)    {
            if (err.kind === "not_found")  {
                res.status(404).send({
                    message: `❌ El post con id ${id} no ha sido encontrado.`
                })
            }else    {
                res.status(500).send({
                    message: err.message || "❌ Error al buscar el post."
                })
            }
        }else res.send(data)
    })
}

exports.getAll = (req, res) =>  {
    Posts.getAll((err, data) => {
        if (err)    {
            if (err.kind === "not_found")   {
                res.status(404).send({
                    message: "No se han encontrado posts."
                })
            }else   {
                res.status(500).send({
                    message: err.message || "❌ Error al buscar posts."
                })
            }
        }else res.send(data)
    })
}