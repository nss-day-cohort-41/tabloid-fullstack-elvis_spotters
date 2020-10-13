import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Container, Row, Button, Table } from "reactstrap";

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
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default PostList