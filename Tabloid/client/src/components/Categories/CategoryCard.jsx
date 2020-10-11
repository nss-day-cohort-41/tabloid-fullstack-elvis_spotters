import React from 'react';
import { Link } from 'react-router-dom';
import "./category.css"
export default ({ category }) => {
    
    let id = category.id;
    const editButton = () =>{
        console.log("EDIT CLICKED", id)
    }
    const deleteButton = () =>{
        console.log("DELETE CLICKED", id)
    }
    return (
        <>
      
                <div className="container category_border row m-1">
                    <h3 className="col-10">{category.name}</h3>
                    <div className="">
                    <Link to={`/category/edit/${id}`} className="btn btn-primary m-1"  onClick={editButton}>Edit</Link>
                    <Link to={`/category/delete/${id}`} className="btn btn-danger m-1" onClick={deleteButton}>Delete</Link>
                    </div>              
                </div>
         
        </>
    )
}