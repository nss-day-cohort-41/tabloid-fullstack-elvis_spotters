import React, { useState, useEffect, useContext } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { CardDeck, Button } from "reactstrap";
import Comment from "./Comment";


const CommentList = () => {
    const { comments } = useContext(CommentContext);

    return (
        <div className="container">
            <h3 className="float-left">Comments</h3>
            <Button className="btn btn-primary float-left">New Comment</Button>
            <hr />
            <CardDeck>
                {comments.map(comment =>
                    <Comment key={comment.id} comment={comment} />
                )}
            </CardDeck>
        </div>
    );

}

export default CommentList;