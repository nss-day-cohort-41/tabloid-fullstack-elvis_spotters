import React, { useState, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";

const NewPost = (props) => {

    const { saveNewPost } = useContext(PostContext);
    const { getCategories } = useContext(CategoryContext);

    const [newPost, setNewPost] = useState();
    const [isLoading, setIsLoading] = useState(false);

    


}

export default NewPost;