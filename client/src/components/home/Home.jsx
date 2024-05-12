import "./Home.scss";
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Home() {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
            }
            catch(err){
                console.log(err)
            }    
        }
        fetchAllBooks();
    }, [])

    useEffect(()=>{
        console.log(books)
    }, [books]);

    const addNewBookHandle = () => {
        navigate("/add")
    }

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/"+id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="homeContainer">
            <h1>Book Store</h1>
            <div className="bookContainer">
            {books.map(book=>(
                <div key={book.id} className="book">
                    {book.cover && <img src={book.cover} alt="book image" />}
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <span>price: {book.price}</span>
                    <div className="buttons">
                        <button className="updateButton"><Link to={`/update/${book.id}`} >Update</Link></button>
                        <button onClick={()=>handleDelete(book.id)} className="deleteButton">Delete</button>
                    </div>
                </div>
            ))}
            </div>   
            <button style={{height: "30px"}} onClick={addNewBookHandle}>Add New Book</button>        
        </div>
    )
}
