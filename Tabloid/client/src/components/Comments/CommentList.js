import React, { useEffect, useState, useContext } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button } from "reactstrap";
import Comment from "./Comment";
import { useParams, useHistory } from "react-router-dom";


const CommentList = () => {
    const { comments, getCommentsByPostId, getPost } = useContext(CommentContext);
    const { postId } = useParams();
    const history = useHistory();
    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        getCommentsByPostId(postId)
            .then(getPost(postId)
                .then(result => setPost(result)))
        const user = JSON.parse(sessionStorage.userProfile);
        setCurrentUser(user.id);

    }, [])



    return (
        <div className="container pt-2 flex-column">

            <div className="d-flex justify-content-between">
                <h3 className="">Comments</h3>
                {post !== undefined ? <h3 className="">{post.title}</h3> : <h3 className="">placeholder</h3>}

            </div>
            <div className="d-flex flex-column">
                <div>
                    <Button className="btn btn-primary float-left mt-1 mb-1" type="button" onClick={() => history.push(`/comments/${postId}/create`)}>New Comment</Button>
                    <Button className="btn btn-danger float-right mt-1 mb-1" type="button" onClick={() => history.push(`/post/${postId}/details`)}>return</Button>
                </div>
                <hr />
                <div className="d-flex flex-column align-content-center">
                    {
                        comments.map(comment =>
                            <Comment key={comment.id} Comment={comment} PostId={postId} CurrentUser={currentUser} />
                        )
                    }

                </div>
            </div>

        </div>
    );

}

export default CommentList;