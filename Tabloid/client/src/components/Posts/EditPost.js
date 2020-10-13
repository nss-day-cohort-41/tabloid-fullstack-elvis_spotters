import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, FormGroup, Col, Label, Input, Button, FormFeedback, FormText } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { ValidateNewPost } from "./ValidateNewPost";

const EditPost = (props) => {

    const { getPost, updatePost, categories, getCategories } = useContext(PostContext);

    const [editedPost, setEditedPost] = useState({
        id: -1,
        title: "",
        content: "",
        imageLocation: undefined,
        createDateTime: "",
        publishDateTime: "",
        isApproved: false,
        categoryId: -1,
        userProfileId: -1
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [formFeedback, setFormFeedback] = useState({
        title: false,
        content: false,
        imageLocation: false,
        categoryId: false
    });

    const { id } = useParams();
    const history = useHistory();

    const handleFieldChange = (evt) => {
        const stateToUpdate = { ...editedPost };
        const formFeedbackUpdate = { ...formFeedback };
        stateToUpdate[evt.target.name] = evt.target.value;
        const checkValidForm = ValidateNewPost(stateToUpdate);
        setIsFormValid(checkValidForm.isValidated);
        // Set boolean to display errors on the form
        if (checkValidForm.field === evt.target.name) {
            formFeedbackUpdate[checkValidForm.field] = true;
        } else {
            // ValidateNewPost will only return invalid fields, so the field
            // is selected from the input
            formFeedbackUpdate[evt.target.name] = false;
        }
        setFormFeedback(formFeedbackUpdate);
        setEditedPost(stateToUpdate);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const validation = ValidateNewPost(editedPost);
        setIsFormValid(validation.isValidated);

        if (validation.isFormValid === false) {

            const formFeedbackUpdate = { ...formFeedback };
            formFeedbackUpdate[validation.field] = true;
            setFormFeedback(formFeedbackUpdate);

        } else {

            // Build object to send. Id, createDateTime, and userProfileId should come from the original post and not be editable by the user.
            const submittedPost = {
                id: editedPost.id,
                title: editedPost.title,
                content: editedPost.content,
                imageLocation: editedPost.imageLocation || null,
                createDateTime: editedPost.createDateTime,
                publishDateTime: editedPost.publishDateTime || null,
                isApproved: editedPost.isApproved,
                categoryId: parseInt(editedPost.categoryId),
                userProfileId: editedPost.userProfileId
            }

            updatePost(submittedPost)
                .then(() => history.push("/"));
        }
    }

    useEffect(() => {
        getCategories();
        getPost(id).then(setEditedPost);
    }, []);

    if (!editedPost) {
        return null;
    }

    return (
        <Container>
            <div>
                <h1>Edit Post</h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="title" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Title your post" maxLength="255"
                            invalid={formFeedback.title} value={editedPost.title} required onChange={handleFieldChange} />
                        <FormFeedback>Please give this post a title</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>Post Content</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="content" id="content" placeholder="Say what you want to say here..." required
                            invalid={formFeedback.content} value={editedPost.content} onChange={handleFieldChange} />
                        <FormFeedback>Enter some text for content</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageLocation" sm={2}>Image URL (optional)</Label>
                    <Col sm={10}>
                        <Input type="url" name="imageLocation" id="imageLocation" placeholder="https://website.com/mypic" maxLength="255"
                            invalid={editedPost.imageLocation !== undefined && formFeedback.imageLocation} defaultValue={editedPost.imageLocation} onChange={handleFieldChange} />
                        <FormFeedback>Please enter a proper URL, including http or https, or leave blank</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="publishDateTime" sm={2}>Date to Publish (Optional)</Label>
                    <Col sm={10}>
                        {(editedPost.publishDateTime)
                            ? <Input type="date" name="publishDateTime" id="publishDateTime" defaultValue={editedPost.publishDateTime.substring(0, 10) || null}
                                onChange={handleFieldChange} />
                            : <Input type="date" name="publishDateTime" id="publishDateTime"
                                onChange={handleFieldChange} />
                        }
                        <FormText>This post will not be visible on the main page until the date entered here. Delete to unpublish.</FormText>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="categoryId" sm={2}>Category</Label>
                    <Col sm={10}>
                        <Input type="select" name="categoryId" id="categoryId" invalid={formFeedback.categoryId} value={editedPost.categoryId}
                            onChange={handleFieldChange} required>
                            <option defaultValue="">Select a Category</option>
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

export default EditPost;