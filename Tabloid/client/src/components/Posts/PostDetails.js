import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";

const PostDetails = (props) => {

    const { getPost } = useContext(PostContext);
    const { id } = useParams();

    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    if (sessionStorage.getItem.id === post.userProfileId) {
        setCurrentUser(true);
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
                    <p className="text-black-50">Published on {post.publishDateTime}</p>
                </Row>

                <Row>
                    {currentUser
                        ? <>
                            <Button class="button btn-primary">Edit</Button>
                        </>
                        : null}
                    <Button class="button btn-primary">Delete</Button>
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

        </Container>
    )
}

export default PostDetails;