import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const Post = ({ post, currentUser }) => {

    const history = useHistory();

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
            <td>
                {(currentUser === post.userProfile.id)
                    ? <Button color="primary" onClick={() => history.push(`/post/${post.id}/edit`)}>Edit</Button>
                    : null}
                <Button color="primary" onClick={() => history.push(`/post/${post.id}/delete`)}>Delete</Button>

            </td>
        </tr>
    )
}

export default Post