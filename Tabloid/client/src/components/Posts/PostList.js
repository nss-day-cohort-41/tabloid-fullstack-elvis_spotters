import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Container, Row, Button } from "reactstrap";

const PostList = (props) => {

    const { posts, getAllPosts } = useContext(PostContext);

    const history = useHistory();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <Container>
            <Row>
                <h2>User Posts</h2>
            </Row>
            <Row>
                <Button onClick={() => history.push("/post/new")}>Create New Post</Button>
            </Row>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </Container>
    )
}

export default PostList