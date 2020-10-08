import React from "react";

export default () =>{


    const submitCategory =()=>{
        
    }

    return (
        <>
        <form>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Category Name</label>
    <input
      type="text"
      className="form-control"
      id="categoryName"
      aria-describedby="categoryNameInputField"
      placeholder="Category Name"
    />
 </div>
  <button type="submit" onCLick={submitCategory} className="btn btn-primary">
    Submit
  </button>
</form>

        </>
    )
}