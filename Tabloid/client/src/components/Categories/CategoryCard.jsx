import React from 'react';
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
                    <button className="btn btn-primary m-1"  onClick={editButton}>Edit</button>
                    <button className="btn btn-danger m-1" onClick={deleteButton}>Delete</button>
                    </div>              
                </div>
         
        </>
    )
}