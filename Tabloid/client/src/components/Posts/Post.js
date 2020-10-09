import React, { useContext } from "react";
import { Router } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider"



const Post = ({ post }) => {

    const history = useHistory();
    const { getCommentsByPostId } = useContext(CommentContext);

    return (
        <Row>
            <Col>
                <strong>{post.title}</strong>
            </Col>
            <Col>
                <em>by {post.userProfile.fullName}</em>
            </Col>
            <Col>
                <p>{post.category.name}</p>
            </Col>
            <Button className="btn-Primary float-left" onClick={() => { history.push(`comments/${post.id}`) }}>View Comments</Button>
        </Row>
    )
}

export default Post