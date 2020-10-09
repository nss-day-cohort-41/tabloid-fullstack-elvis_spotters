import React from "react";
import {CategoryContext} from "../../providers/CategoryProvider"
import {useHistory} from 'react-router-dom';

export default (props) =>{
    const [category, setCategory] = React.useState("");
    const {createCategory} = React.useContext(CategoryContext);
    const history = useHistory()
    const submitCategory =()=>{
      if(category.length < 3 || category.length > 25) return;
      createCategory({Name:category});
      history.push("/category")
        
    }

    return (
        <>
        <form onSubmit={e=>e.preventDefault()}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Category Name</label>
    <input
      type="text"
      className="form-control"
      id="categoryName"
      value={category}
      aria-describedby="categoryNameInputField"
      placeholder="Category Name"
      onChange={e=>setCategory(e.target.value)}
    />
    {category.length > 25 ? <small className="">category name much be under 25 characters</small> : category.length < 3 ? <small>must be greate than 2 characters</small> : <small></small>}
 </div>
 
 
  <button type="button" onClick={submitCategory} className="btn btn-primary">
    Submit
  </button>
</form>


        </>
    )
}