import React from 'react';
import {CategoryContext} from "../../providers/CategoryProvider";
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CreateCategory"
import 'bootstrap/dist/css/bootstrap.min.css';
export default () =>{
    const {categories} = React.useContext(CategoryContext);
    const allCategories = categories.map((ele, index)=>{
    return <CategoryCard category={ele}/>
    })
    return (
        <>
        <CreateCategory/>
        <div className="container">
        {allCategories}
        </div>
        </>
    )
}