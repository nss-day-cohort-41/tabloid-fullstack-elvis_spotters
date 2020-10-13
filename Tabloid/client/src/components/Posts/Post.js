import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {


    return (
        <tr>
            <td>
                <Link to={`/post/${post.id}/details`} >
                    <strong>{post.title}</strong>
                </Link>
            </td>
            <td>
                <em>by {post.userProfile.fullName}</em>
            </td>
            <td>
                <p>{post.category.name}</p>
            </td>
        </tr>
    )
}

export default Post