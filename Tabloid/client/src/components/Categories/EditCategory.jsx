import React from 'react';
import { useEffect } from 'react';
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from "react-router-dom";
const EditCategory = (props) => {
    const [cat, setCat] = React.useState({
        id: 0,
        name: ""
    });
    const history = useHistory();
    const { getCategoryById, editCategory } = React.useContext(CategoryContext)
    const currentCategory = async () => {
        let cat = await getCategoryById(props.match.params.id)
        setCat(cat);
    }
    const submitCategory = async () => {
        if (cat.name.length < 3 || cat.name.length > 25) return;
       await editCategory(cat)
        history.push("/category")
    }

    useEffect(() => {
        currentCategory();
    }, [])

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Edit Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        value={cat.name}
                        aria-describedby="categoryNameInputField"
                        placeholder="Category Name"
                        onChange={e => setCat({ ...cat, name: e.target.value })}
                    />
                    {cat.name.length > 25 ? <small className="">category name much be under 25 characters</small> : cat.name.length < 3 ? <small>must be greate than 2 characters</small> : <small></small>}
                </div>


                <button type="button" onClick={submitCategory} className="btn btn-primary">
                    Submit
  </button>
  <button type="button" onClick={history.push("/category")} className="btn btn-primary">
                    Cancel
  </button>
            </form>
        </>
    )
}
export default EditCategory