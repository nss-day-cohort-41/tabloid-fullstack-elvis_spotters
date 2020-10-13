import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Button } from "reactstrap";

const DeletePost = (props) => {

    const { getPost, deletePost } = useContext(PostContext);
    const { id } = useParams();

    const [post, setPost] = useState();

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.userProfile);

    useEffect(() => {
        getPost(id).then((res) => {
            if (loggedInUser.id !== res.userProfileId) {
                history.push(`/post/${id}/details`);
            }
            setPost(res)
        });
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
        <Container pt={5}>
            <h1>Delete</h1>
            <h3>Do you want to delete this?</h3>
            <section className="justify-content-center">
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

                <Row>
                    <Button color="primary" onClick={confirmDelete}>Delete</Button>
                    <Button color="primary" onClick={() => history.push(`/post/${post.id}/details`)}>Cancel</Button>
                </Row>
            </section>
        </Container>
    )
}

export default DeletePost;