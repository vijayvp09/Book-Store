import "./Add.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
    const [book, setBook] = useState({
        title:"",
        description:"",
        price: null,
        cover:""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]: e.target.value,}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await axios.post("http://localhost:8800/books",book);
        }
        catch(err){
            console.log(err)
        }
        navigate("/");
    }

    return(
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="title" name="title" onChange={handleChange} />
            <input type="text" placeholder="description" name="description" onChange={handleChange} />
            <input type="number" placeholder="price" name="price" onChange={handleChange} />
            <input type="text" placeholder="cover" name="cover" onChange={handleChange} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}