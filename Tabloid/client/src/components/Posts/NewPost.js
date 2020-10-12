import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, FormGroup, Col, Label, Input, Button, FormFeedback, FormText } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { ValidateNewPost } from "./ValidateNewPost";

const NewPost = (props) => {

    const { saveNewPost, categories, getCategories } = useContext(PostContext);

    const [newPost, setNewPost] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formFeedback, setFormFeedback] = useState({
        title: false,
        content: false,
        imageLocation: false,
        categoryId: false
    });

    const history = useHistory();

    const handleFieldChange = (evt) => {
        const stateToUpdate = { ...newPost };
        const formFeedbackUpdate = { ...formFeedback };
        stateToUpdate[evt.target.name] = evt.target.value;
        const checkValidForm = ValidateNewPost(stateToUpdate);
        setIsFormValid(checkValidForm.isValidated);
        // Set boolean to display errors on the form
        if (checkValidForm.field === evt.target.name) {
            formFeedbackUpdate[checkValidForm.field] = true;
        } else {
            // ValidateNewPost will not return the field if valid, so the field
            // is selected from the input
            formFeedbackUpdate[evt.target.name] = false;
        }
        setFormFeedback(formFeedbackUpdate);
        setNewPost(stateToUpdate);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const validation = ValidateNewPost(newPost);
        setIsFormValid(validation.isValidated);

        if (validation.isFormValid === false) {

            const formFeedbackUpdate = { ...formFeedback };
            formFeedbackUpdate[validation.field] = true;
            setFormFeedback(formFeedbackUpdate);

        } else {

            // Build object to send. Post is assigned the current userProfileId, date, and a "true" value to isApproved by the API.
            const submittedPost = {
                title: newPost.title,
                content: newPost.content,
                imageLocation: newPost.imageLocation || null,
                publishDateTime: newPost.publishDateTime || null,
                categoryId: parseInt(newPost.categoryId)
            }

            saveNewPost(submittedPost)
                .then(() => history.push("/"));
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container>
            <div>
                <h1>Create a New Post</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="title" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Title your post" maxLength="255"
                            invalid={formFeedback.title} required onChange={handleFieldChange} />
                        <FormFeedback>Please give this post a title</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>Post Content</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="content" id="content" placeholder="Say what you want to say here..." required
                            invalid={formFeedback.content} onChange={handleFieldChange} />
                        <FormFeedback>Enter some text for content</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageLocation" sm={2}>Image URL (optional)</Label>
                    <Col sm={10}>
                        <Input type="url" name="imageLocation" id="imageLocation" placeholder="https://website.com/mypic" maxLength="255"
                            invalid={newPost.imageLocation !== undefined && formFeedback.imageLocation} onChange={handleFieldChange} />
                        <FormFeedback>Please enter a proper URL, including http or https, or leave blank</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="publishDateTime" sm={2}>Date to Publish (Optional)</Label>
                    <Col sm={10}>
                        <Input type="date" name="publishDateTime" id="publishDateTime"
                            onChange={handleFieldChange} />
                        <FormText>This post will not be visible on the main page until the date entered here.</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="categoryId" sm={2}>Category</Label>
                    <Col sm={10}>
                        <Input type="select" name="categoryId" id="categoryId" invalid={formFeedback.categoryId}
                            onChange={handleFieldChange} required>
                            <option value="">Select a Category</option>
                            {categories.map(category =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </Input>
                        <FormFeedback>Select a category</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={1}>
                        <Button className="primary" disabled={!isFormValid}>Submit</Button>
                    </Col>
                    <Col sm={1}>
                        <Button className="secondary" type="button" onClick={() => history.push("/")}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Container>
    )


}

export default NewPost;