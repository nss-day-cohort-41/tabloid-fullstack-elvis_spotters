import React, { useEffect, useContext } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { CardDeck, Button } from "reactstrap";
import Comment from "./Comment";
import { useParams } from "react-router-dom";


const CommentList = () => {
    const { comments, getCommentsByPostId } = useContext(CommentContext);

    const { postId } = useParams();

    useEffect(() => {
        getCommentsByPostId(postId)

    }, [])




    return (
        <div className="container pt-2 flex-column">
            <h3 className="align-left">Comments</h3>
            <h3 className="float-right">Title</h3>
            <div className="d-flex flex-column">
                <Button className="btn btn-primary float-left mt-1 mb-1">New Comment</Button>
                <hr />
                <div className="d-flex flex-column align-content-center">
                    {comments.map(comment =>
                        <Comment key={comment.id} Comment={comment} />
                    )}
                </div>
            </div>

        </div>
    );

}

export default CommentList;