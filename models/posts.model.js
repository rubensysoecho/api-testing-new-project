const sql = require("./db.js")

const Posts = function(post)    {
    this.userID = post.userID
    this.image = post.image
    this.title = post.title
    this.description = post.description
    this.published_date = post.published_date
}

Posts.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err)    {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        console.log("Post creado: ", { id: insertId, ...newPost })
        result(null, { id: res.insertId, ...newPost })
    })
}

Posts.findById = (id, result) =>    {
    sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
        if (err)    {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Post encontrado: ", res[0])
            result(null, res[0])
            return
        }

        result({ kind: "not_found" }, null)
    })
}

Posts.findByUserId = (id, result) =>    {
    sql.query(`SELECT * FROM posts WHERE userID = ${id}`, (err, res) => {
        if (err)    {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Post encontrado: ", res[0])
            result(null, res[0])
            return
        }

        result({ kind: "not_found" }, null)
    })
}

Posts.getAll = (title, result) =>   {
    let query = "SELECT * FROM posts"

    if (title)  {
        query += `WHERE title LIKE '%${title}%'`
    }

    sql.query(query, (err, res) =>  {
        if (err)    {
            console.log("Error: ", err)
            result(null, err)
            return
        }

        console.log("Posts: ", res)
        result(null, res)
    })
}

Posts.updateById = (id, post, result) =>    {
    sql.query("UPDATE posts SET userID = ?, image = ?, title = ?, description = ?, published_date = ? WHERE id = ?",
    [post.userID, post.image, post.title, post.description, post.published_date, id]),
    (err, res) =>   {
        if (err)    {
            console.log("Error: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows == 0)  {
            result( {kind: "not_found"}, null )
        }

        console.log("Post actualizado: ", { id: id, ...post })
        result(null, { id: id, ...post })
    }
}

Posts.remove = (id, result) =>  {
    sql.query("DELETE FROM posts WHERE id IS ?", id, (err, res) =>  {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Post borrado con ID: ", id);
        result(null, res);
    })
}

module.exports = Posts