import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "reactstrap";

const PostDetails = (props) => {

    const { getPost, getTagsByPostId } = useContext(PostContext);
    const { id } = useParams();

    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState(false);

    // State for tags associated with post
    const [tags, setTags] = useState([]);

    // Method to get all tags associated with post
    const getTagsByPostIdFromDb = async () => {
        const res = await getTagsByPostId(id);
        setTags(res);
    }

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.userProfile)

    useEffect(() => {
        getPost(id).then((res) => {
            if (loggedInUser.id === res.userProfileId) {
                setCurrentUser(true);
            }
            setPost(res)
        });

        // Invoking method to get all tags associated with post upon page load
        getTagsByPostIdFromDb();
    }, [tags]);

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

                <Row>
                    {currentUser
                        ? <Button color="primary">Edit</Button>
                        : null}
                    <Button color="primary">Delete</Button>
                    <Button onClick={() => history.push(`/post/tags/${id}`)}>Manage Tags</Button>
                </Row>
            </section>

            <hr />

            {/* Rendering of associated tags on post details */}
            <Row className="mb-3 px-3">
                {tags.map(tag => <Badge color="dark" className="p-2 mr-2" key={tag.id}>{tag.tag.name}</Badge>)}
            </Row>

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
        </Container>
    )
}

export default PostDetails;