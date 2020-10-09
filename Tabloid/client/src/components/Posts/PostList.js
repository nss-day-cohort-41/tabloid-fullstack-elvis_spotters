import React, { useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Container, Row } from "reactstrap";
import { CommentContext, CommentProvider } from "../../providers/CommentProvider"

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
            {posts.map((post) => (
                <>
                    <CommentProvider>
                        <Post key={post.Id} post={post} />
                    </CommentProvider>
                    <hr />
                </>
            ))}
        </Container>
    )
}

export default PostList