import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Post = ({ post, currentUser }) => {

    const { isAdministrator } = useContext(UserProfileContext);
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
                {(currentUser === post.userProfile.id || isAdministrator)
                    ? <Button color="primary" onClick={() => history.push(`/post/${post.id}/delete`)}>Delete</Button>
                    : null
                }
            </td>
        </tr>
    )
}

export default Post