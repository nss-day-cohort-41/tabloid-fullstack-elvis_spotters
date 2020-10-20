import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory, useParams } from "react-router-dom";
import { Row, Button } from "reactstrap";

const DeletePost = (props) => {

    const { getPost, deletePost } = useContext(PostContext);
    const { isAdministrator } = useContext(UserProfileContext);
    const { id } = useParams();

    const [post, setPost] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.userProfile);
        getPost(id).then((res) => {
            if (res.userProfileId != loggedInUser.id && !isAdministrator) {
                // Kick back to post list if another user reaches this area
                history.push("/post");
            } else {
            setPost(res);
            setIsLoaded(true);
            }
        })
    }, []);

    if (!post) {
        return null;
    }

    const confirmDelete = (evt) => {
        evt.preventDefault();
        deletePost(post.id)
            .then(() => history.push("/post"));
    }

    return (
        <>
            <section className="justify-content-center">
            <h1 className="text-center">Delete Post</h1>
            <h3 className="text-center">Do you want to delete this?</h3>
                <dl className="row">
                    <dt className="col-sm-2">Title</dt>
                    <dt className="col-sm-10">{post.title}</dt>
                </dl>
                <dl className="row">
                    <dt className="col-sm-2">Content</dt>
                    <dt className="col-sm-10">{post.content}</dt>
                </dl>
                <dl className="row">
                    <dt className="col-sm-2">Creation Date</dt>
                    <dt className="col-sm-10">{post.createDateTime.substring(0, 10)}</dt>
                </dl>
                <dl className="row">
                    <dt className="col-sm-2">Publication Date</dt>
                    {(post.publishDateTime)
                        ? <dt className="col-sm-10">{post.publishDateTime.substring(0, 10)}</dt>
                        : <dt className="col-sm-10">Unpublished</dt>
                    }
                </dl>
                <dl className="row">
                    <dt className="col-sm-2">Category</dt>
                    <dt className="col-sm-10">{post.category.name}</dt>
                </dl>
                <dl className="row">
                    <dt className="col-sm-2">Author</dt>
                    <dt className="col-sm-10">{post.userProfile.displayName}</dt>
                </dl>

                <Row className="px-5">
                    <Button color="danger" block onClick={confirmDelete} disabled={!isLoaded}>Delete</Button>
                    <Button color="primary" block onClick={() => history.goBack()}>Cancel</Button>
                </Row>
            </section>
        </>
    )
}

export default DeletePost;