import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";

const PostDetails = (props) => {

    const { getPost } = useContext(PostContext);
    const { id } = useParams();
    const [post, setPost] = useState();

    const history = useHistory();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    return (
        <Container pt={5}>
            {}
            <Row>
                <section className="px-3">
                    <Row className="justify-content-between">
                        <h1 className="text-secondary">{post.title}</h1>
                        <h1 className="text-black-50">{post.category.name}</h1>
                    </Row>

                    <Row className="justify-content-between">
                        <p className="text-secondary">Written by {post.userProfile.displayName}</p>
                        <p className="text-black-50">Published on {post.publishDateTime}</p>
                    </Row>


                </section>
            </Row>
        </Container>
    )
}

export default PostDetails;