import React, { useEffect, useState, useContext } from 'react';
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from "react-router-dom";
import { Card, Table, Button } from 'reactstrap';


const DeleteComment = () => {

    const { postId, commentId } = useParams();
    const history = useHistory();
    const [comment, setComment] = useState();
    const { getComment, deleteComment } = useContext(CommentContext);

    const handleDelete = (commentId) => {
        deleteComment(commentId).then(() => history.push(`/comments/${postId}`))
    }

    useEffect(() => {
        getComment(postId, commentId).then(result => setComment(result))
    }, [])

    return (
        <>
            <h2>Are you sure you want to delete this comment?</h2>
            <hr />
            {comment === undefined ?
                <h4>Loading...</h4>
                :
                <Card className="p-3">
                    <Table borderless>
                        <tbody className="justify-content-start">
                            <tr>
                                <th scope="row" className="p-2">User:</th>
                                <td>{comment.userProfile.displayName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-2">Subject:</th>
                                <td>{comment.subject}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-2">Content:</th>
                                <td>{comment.content}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="p-2">Posted on:</th>
                                <td>{comment.createDateTime.substring(0, 10)}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <div className="d-flex">
                        <Button className="btn btn-danger m-2" onClick={() => { handleDelete(commentId) }}>Delete</Button>
                        <Button type="button" className="btn btn-primary m-2" onClick={() => { history.push(`/comments/${postId}`) }}>Return</Button>
                    </div>
                </Card>
            }


        </>
    )
}

export default DeleteComment;