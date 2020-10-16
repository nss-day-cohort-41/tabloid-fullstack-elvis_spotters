import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const PostDetails = (props) => {

    const { getPost } = useContext(PostContext);
    const { getToken } = useContext(UserProfileContext);
    const { id } = useParams();

    const [post, setPost] = useState();
    const [currentUser, setCurrentUser] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

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
            if (loggedInUser.id === res.userProfileId) {
                setCurrentUser(true);
            }
            checkSubscription(res.userProfileId).then(setIsSubscribed);
            setPost(res)
        });

    }, []);

    const subscribe = (evt) => {
        evt.preventDefault();
        const subscription = {
            subscriberUserProfileId: loggedInUser.id,
            providerUserProfileId: post.userProfileId
        };
        getToken().then((token) =>
        fetch("/api/subscription", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        }).then(res => res.json())
        .then(() => setIsSubscribed(true)));
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
                    {console.log(isSubscribed)}
                    <p className="text-secondary">Written by {post.userProfile.displayName} {'\t'} 
                        <span className="text-success">{isSubscribed
                            ? "Subscribed!"
                            : <Button onClick={subscribe} outline color="primary" size="sm">Subscribe</Button>
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
                <Button className="btn btn-primary m-2" type="button" onClick={() => history.push(`/comments/${post.id}`)} >View Comments</Button>
                <Button className="btn btn-primary m-2" type="button" onClick={() => history.push(`/comments/${post.id}/create`)} >Add Comment</Button>
            </Row>
        </Container>
    )
}

export default PostDetails;