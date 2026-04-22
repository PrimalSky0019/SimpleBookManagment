import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true); // Now the "Something went wrong" message will actually show
        }
    };

    return (
        <div className="form"> 
            <h1>Update the book</h1>
            <input type="text" placeholder="Book title" name="title" onChange={handleChange} />
            <textarea rows={5} placeholder="Book desc" name="desc" onChange={handleChange} />
            <input type="number" placeholder="Book price" name="price" onChange={handleChange} />
            <input type="text" placeholder="Book cover" name="cover" onChange={handleChange} />

            <button className="formButton" onClick={handleClick}>Update</button>
            
            {error && <p style={{color: "red"}}>Something went wrong!</p>}
            
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;
