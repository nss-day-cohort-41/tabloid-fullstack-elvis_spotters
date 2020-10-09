import React from "react";
import { Row, Col } from "reactstrap";

const id = post.id;


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
            <Button className="btn btn-primary float-right">Post Comments</Button>
        </Row>
    )
}

export default Post