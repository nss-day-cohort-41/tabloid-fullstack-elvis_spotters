import React from "react";
import { Row, Col } from "reactstrap";

const Post = ({ post }) => {
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
        </Row>
    )
}

export default Post