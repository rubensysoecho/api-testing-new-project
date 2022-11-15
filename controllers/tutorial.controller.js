const Tutorial = require("../models/tutorial.model.js")

exports.create = (req, res) => {
  
};

exports.findAll = (req, res) => {
  
};

exports.findOne = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) =>  {
    if (!req.body)  {
        res.status(400).send({
            message: "❌ El contenido no puede estar vacío!"
        })
    }


    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    })

    Tutorial.create(tutorial, (err, data) =>    {
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

    Tutorial.getAll(title, (err, data) =>   {
        if (err)
            res.status(500).send({
                message:
                    err.message || "❌Error al listar los tutoriales."
            })
        else res.send(data)
    })
}