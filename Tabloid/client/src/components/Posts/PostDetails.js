import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const PostDetails = (props) => {

    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState(false);

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.userProfile);



    useEffect(() => {
        getPost(id).then((res) => {
            if (loggedInUser.id === res.userProfileId) {
                setCurrentUser(true);
            }
            setPost(res)
        });
    }, []);

    const getReadTime = () => {
        if (!post.content) return ("0 minutes");
        const wordCount = post.content.split(" ").length;
        const readTime = Math.ceil(wordCount / 265);
        if (readTime === 1) {
            return "1 minute";
        } else {
            return `${readTime} minutes`;
        }
    }

    if (!post) {
        return null;
    }

    return (
        <Container pt={5}>
            <section className="px-3">
                <Row className="justify-content-between">
                    <h1 className="text-secondary">{post.title}</h1>
                    <h1 className="text-black-50">{post.category.name}</h1>
                </Row>

                <Row className="justify-content-between">
                    <p className="text-secondary">Written by {post.userProfile.displayName}</p>
                    {(post.publishDateTime)
                        ? <p className="text-black-50">Published on {post.publishDateTime.substring(0, 10)}</p>
                        : <p className="text-black-50">Unpublished</p>
                    }
                </Row>

                <Row className="justify-content-start">
                    <p className="text-secondary">Estimated read time: {getReadTime()}</p>
                </Row>
                <Row>
                    {currentUser
                        ? <Button color="primary" onClick={() => history.push(`/post/${post.id}/edit`)}>Edit</Button>
                        : null}
                    <Button color="primary" onClick={() => history.push(`/post/${post.id}/delete`)}>Delete</Button>
                </Row>
            </section>

            <hr />

            {post.imageLocation !== null
                ? <Row className="justify-content-center">
                    <div>
                        <img src={`${post.imageLocation}`}></img>
                    </div>
                </Row>
                : null
            }

            <Row>
                <Col sm={12} mt={5}>
                    <p>{post.content}</p>
                </Col>
            </Row>
            <Row>
                <Button className="btn btn-primary" onClick={() => history.push(`/comments/${post.id}`)} >View Comments</Button>
            </Row>
        </Container>
    )
}

export default PostDetails;