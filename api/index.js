const express = require("express");
const mysql =  require("mysql");
const app = express();
const cors = require("cors");



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vijayvpillai",
    database: "bookstore"
});
app.use(cors());
app.use(express.json());
app.get("/", (req, res)=> {
    res.json("server working");
});

app.get("/books", (req, res)=> {
    const query = "SELECT * FROM store"
    db.query(query,(err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/books", (req, res)=> {
    const {title, description, price, cover} = req.body;
    const query = "INSERT INTO store (title, description, price, cover) VALUES (?,?,?,?)";
    const values = [
        title,
        description,
        price,
        cover
    ];
    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("succesfully added book")
    })
})

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM store WHERE id=?"
    db.query(query, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json({message: "deleted"})
    })
})

app.put("/books/:id", (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    const query = "UPDATE store SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ]
    db.query(query, [...values, id], (err, data) => {
        if(err) return res.json(err);
        return res.json("updated")

    });
});

app.listen(8800,()=> console.log("app is listenting"));