import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const PostDetails = (props) => {

    const { getPost, getTagsByPostId } = useContext(PostContext);
    const { getToken, isAdministrator } = useContext(UserProfileContext);
    
    const { id } = useParams();

    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // State for tags associated with post
    const [tags, setTags] = useState([]);

    // Method to get all tags associated with post
    const getTagsByPostIdFromDb = async () => {
        const res = await getTagsByPostId(id);
        setTags(res);
    }

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.userProfile);

    useEffect(() => {

        const checkSubscription = async (providerId) => {
            const token = await getToken();
            const res = await fetch(`../../api/subscription/check?id=${providerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const value = await res.json();
            return value;
        }

        getPost(id).then((res) => {
            console.log(res)
            if (loggedInUser.id !== res.userProfileId && (!res.publishDateTime || !res.isApproved)) {
                history.push("/post");
            } else if (loggedInUser.id === res.userProfileId) {
                setCurrentUser(true);
            }
            checkSubscription(res.userProfileId).then(setIsSubscribed);
            setPost(res)
        });

        // Invoking method to get all tags associated with post upon page load
        getTagsByPostIdFromDb();
    }, []);

    // Both subscription methods return only the current post's author Id.
    // The rest of the subscription is built by the API to limit possible interaction with the user.
    const subscribe = (evt) => {
        evt.preventDefault();
        getToken().then((token) =>
        fetch(`/api/subscription/${post.userProfileId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(() => setIsSubscribed(true)));
    }

    const unsubscribe = (evt) => {
        evt.preventDefault();
        getToken().then((token) =>
        fetch(`/api/subscription/${post.userProfileId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(() => setIsSubscribed(false)));
    }

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
                    <p className="text-secondary">Written by {post.userProfile.displayName} {'\t'} 
                        <span className="text-success">{isSubscribed
                            ? <Button onClick={unsubscribe} outline color="danger" size="sm">Unubscribe</Button>
                            : <Button onClick={subscribe} outline color="theme-primary" size="sm">Subscribe</Button>
                        } </span>
                    </p>
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
                        : null
                    }
                    {currentUser || isAdministrator
                        ? <Button color="primary" onClick={() => history.push(`/post/${post.id}/delete`)}>Delete</Button>
                        : null
                    }
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
            <Row>
                <Button color="theme-primary" className="m-2" type="button" onClick={() => history.push(`/comments/${post.id}`)} >View Comments</Button>
                <Button color="theme-primary" className="m-2" type="button" onClick={() => history.push(`/comments/${post.id}/create`)} >Add Comment</Button>
            </Row>
        </Container>
    )
}

export default PostDetails;