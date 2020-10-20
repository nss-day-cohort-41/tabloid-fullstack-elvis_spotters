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
                <Link to={`/post/${post.id}/details`} className="text-primary">
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
                    ? <Button outline color="primary" className="mx-1" onClick={() => history.push(`/post/${post.id}/edit`)}>Edit</Button>
                    : null}
                {(currentUser === post.userProfile.id || isAdministrator)
                    ? <Button outline color="primary" className="mx-1" onClick={() => history.push(`/post/${post.id}/delete`)}>Delete</Button>
                    : null
                }
            </td>
        </tr>
    )
}

export default Post