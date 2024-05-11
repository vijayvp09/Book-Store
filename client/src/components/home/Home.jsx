import "./Home.scss";
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
    const [books, setBooks] = useState([])
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

    return(
        <div className="homeContainer">
            {books.map(book=>(
                <div key={book.id}>
                    {book.cover && <img src={book.cover} alt="book image" />}
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <span>price: {book.price}</span>
                </div>
            ))}           
        </div>
    )
}
