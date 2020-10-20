import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Row, Table } from "reactstrap";

const Homepage = (props) => {

    const { posts, getSubscriptions } = useContext(PostContext);

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        getSubscriptions();
        const loggedInUser = JSON.parse(sessionStorage.userProfile);
        setCurrentUser(loggedInUser.id);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Row>
                <h1>Posts from Authors You have Subscribed To</h1>
            </Row>
                    {posts.length > 0
                    ? <Table striped>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <Post key={post.id} post={post} currentUser={currentUser} />
                                ))}
                        </tbody>
                    </Table>
                    : <p><em>Subscribe to some authors to see their posts here.</em></p>
                    }
        </>
    )
}

export default Homepage