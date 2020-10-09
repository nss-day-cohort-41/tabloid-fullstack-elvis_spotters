import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, FormGroup, Col, Label, Input, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";

const NewPost = (props) => {

    const { saveNewPost, categories, getCategories } = useContext(PostContext);

    const [newPost, setNewPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleFieldChange = (evt) => {
        const stateToUpdate = { ...newPost };
        stateToUpdate[evt.target.name] = evt.target.value;
        setNewPost(stateToUpdate);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsLoading(true);

        // Build object to send. Post is assigned the current userProfileId, date, and a "true" value to isApproved by the API.
        const submittedPost = {
            title: newPost.title,
            content: newPost.content,
            imageLocation: newPost.imageLocation || null,
            publishDateTime: newPost.publishDateTime || null,
            categoryId: newPost.categoryId
        }

        saveNewPost(submittedPost)
            .then(() => history.push("/"));
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container>
            <div>
                <h1>Create a New Post</h1>
            </div>
            <Form>
                <FormGroup row>
                    <Label for="title" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Title your post" required
                            onChange={handleFieldChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>Post Content</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="content" id="content" placeholder="Say what you want to say here..." required
                            onChange={handleFieldChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageLocation" sm={2}>Image URL (optional)</Label>
                    <Col sm={10}>
                        <Input type="url" name="imageLocation" id="imageLocation" placeholder="https://website.com/mypic"
                            onChange={handleFieldChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="publishDateTime" sm={2}>Date to Publish</Label>
                    <Col sm={10}>
                        <Input type="date" name="publishDateTime" id="publishDateTime"
                            onChange={handleFieldChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="categoryId" sm={2}>Category</Label>
                    <Col sm={10}>
                        <Input type="select" name="categoryId" id="categoryId" required onChange={handleFieldChange} >
                            <option value="">Select a Category</option>
                            {categories.map(category =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </Container>
    )


}

export default NewPost;