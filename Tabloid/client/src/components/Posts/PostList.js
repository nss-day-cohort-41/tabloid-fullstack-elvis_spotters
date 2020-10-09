import React, { useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Container, Row } from "reactstrap";

const PostList = (props) => {

    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <Container>
            <Row>
                <h2>User Posts</h2>
            </Row>
            <Row>
                <Button onClick={() => props.history.push("/post/new")}>Create New Post</Button>
            </Row>
            {posts.map((post) => (
                <Post key={post.Id} post={post} />
            ))}
        </Container>
    )
}

export default PostList