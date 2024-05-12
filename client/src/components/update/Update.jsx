import "./Update.scss";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Update() {
    const [book, setBook] = useState({
        title:"",
        description:"",
        price: null,
        cover:""
    });
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]: e.target.value,}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await axios.put("http://localhost:8800/books/"+bookId, book);
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
        navigate("/");
    }

    return(
        <div className="form">
            <h1>Update Book</h1>
            <input type="text" placeholder="title" name="title" onChange={handleChange} />
            <input type="text" placeholder="description" name="description" onChange={handleChange} />
            <input type="number" placeholder="price" name="price" onChange={handleChange} />
            <input type="text" placeholder="cover" name="cover" onChange={handleChange} />
            <button onClick={handleSubmit}>Update</button>
        </div>
    )
}