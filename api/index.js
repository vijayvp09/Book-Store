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
    const query = "INSERT INTO store (title, description, cover) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ];
    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("succesfully added book")
    })
})


app.listen(8800,()=> console.log("app is listenting"));